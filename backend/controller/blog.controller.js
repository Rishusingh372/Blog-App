import mongoose from "mongoose";
import { Blog } from "../models/blog.model.js";
import { v2 as cloudinary } from "cloudinary";

// ✅ Create Blog (User => pending, Admin => approved)
export const createBlog = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "Blog Image is required" });
    }

    const { blogImage } = req.files;
    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedFormats.includes(blogImage.mimetype)) {
      return res.status(400).json({
        message: "Invalid photo format. Only jpg, png and webp are allowed",
      });
    }

    const { title, category, about } = req.body;
    if (!title || !category || !about) {
      return res
        .status(400)
        .json({ message: "title, category & about are required fields" });
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
      blogImage.tempFilePath
    );

    const blogData = {
      title,
      about,
      category,
      adminName: req?.user?.name,
      adminPhoto: req?.user?.photo?.url,
      createdBy: req?.user?._id,
      blogImage: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },

      // ✅ moderation logic
      status: req.user.role === "admin" ? "approved" : "pending",
      approvedBy: req.user.role === "admin" ? req.user._id : undefined,
      approvedAt: req.user.role === "admin" ? new Date() : undefined,
    };

    const blog = await Blog.create(blogData);

    return res.status(201).json({
      message:
        blog.status === "approved"
          ? "Blog created successfully"
          : "Blog submitted. Waiting for admin approval.",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

// ✅ Delete Blog (Admin any, User only own pending)
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (req.user.role !== "admin") {
      if (String(blog.createdBy) !== String(req.user._id)) {
        return res.status(403).json({ message: "Not allowed" });
      }
      if (blog.status !== "pending") {
        return res
          .status(403)
          .json({ message: "Approved blog cannot be deleted by user" });
      }
    }

    await blog.deleteOne();
    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

// ✅ Public blogs (only approved)
export const getAllBlogs = async (req, res) => {
  const allBlogs = await Blog.find({ status: "approved" }).sort({
    createdAt: -1,
  });
  res.status(200).json({ blogs: allBlogs });
};

// ✅ Admin blogs (all statuses)
export const getAllBlogsForAdmin = async (req, res) => {
  const allBlogs = await Blog.find().sort({ createdAt: -1 });
  res.status(200).json({ blogs: allBlogs });
};

// ✅ Single blog (public allowed)
export const getSingleBlogs = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Blog id" });
  }
  const blog = await Blog.findById(id);
  if (!blog) return res.status(404).json({ message: "Blog not found" });

  // optional: only allow approved publicly
  if (blog.status !== "approved" && req.user?.role !== "admin") {
    return res.status(403).json({ message: "Blog not approved yet" });
  }

  res.status(200).json(blog);
};

// ✅ My blogs (User/Admin own)
export const getMyBlogs = async (req, res) => {
  const createdBy = req.user._id;
  const myBlogs = await Blog.find({ createdBy }).sort({ createdAt: -1 });
  res.status(200).json(myBlogs);
};

// ✅ Update blog (Admin any, User only own pending)
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Blog id" });
    }

    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (req.user.role !== "admin") {
      if (String(blog.createdBy) !== String(req.user._id)) {
        return res.status(403).json({ message: "Not allowed" });
      }
      if (blog.status !== "pending") {
        return res
          .status(403)
          .json({ message: "Approved blog cannot be edited by user" });
      }
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json(updatedBlog);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

// ✅ Admin approve
export const approveBlog = async (req, res) => {
  const { id } = req.params;

  const blog = await Blog.findById(id);
  if (!blog) return res.status(404).json({ message: "Blog not found" });

  blog.status = "approved";
  blog.approvedBy = req.user._id;
  blog.approvedAt = new Date();
  blog.rejectedReason = undefined;

  await blog.save();
  return res.status(200).json({ message: "Blog approved", blog });
};

// ✅ Admin reject
export const rejectBlog = async (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;

  const blog = await Blog.findById(id);
  if (!blog) return res.status(404).json({ message: "Blog not found" });

  blog.status = "rejected";
  blog.rejectedReason = reason || "Not specified";
  blog.approvedBy = undefined;
  blog.approvedAt = undefined;

  await blog.save();
  return res.status(200).json({ message: "Blog rejected", blog });
};
