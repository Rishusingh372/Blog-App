import express from "express";
import {
  approveBlog,
  createBlog,
  deleteBlog,
  getAllBlogs,
  getAllBlogsForAdmin,
  getMyBlogs,
  getSingleBlogs,
  rejectBlog,
  updateBlog,
} from "../controller/blog.controller.js";

import { isAdmin, isAuthenticated } from "../middleware/authUser.js";

const router = express.Router();

// ✅ User/Admin can create
router.post("/create", isAuthenticated, createBlog);

// ✅ Public: only approved
router.get("/all", getAllBlogs);

// ✅ Public single blog (if you want)
router.get("/single-blog/:id", getSingleBlogs);

// ✅ User/Admin: my blogs
router.get("/my-blog", isAuthenticated, getMyBlogs);

// ✅ Update/Delete (controller checks permission)
router.put("/update/:id", isAuthenticated, updateBlog);
router.delete("/delete/:id", isAuthenticated, deleteBlog);

// ✅ Admin moderation
router.get("/admin/all", isAuthenticated, isAdmin("admin"), getAllBlogsForAdmin);
router.put(
  "/admin/approve/:id",
  isAuthenticated,
  isAdmin("admin"),
  approveBlog
);
router.put("/admin/reject/:id", isAuthenticated, isAdmin("admin"), rejectBlog);

export default router;
