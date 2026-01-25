import { User } from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookies from "../jwt/AuthToken.js";

export const register = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "User photo is required" });
    }
    
    const { photo } = req.files;
    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
    
    if (!allowedFormats.includes(photo.mimetype)) {
      return res.status(400).json({
        message: "Invalid photo format. Only jpg, png and webp are allowed",
      });
    }
    
    const { email, name, password, phone, education, role } = req.body;
    
    if (!email || !name || !password || !phone || !education || !role) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    // Check if phone number already exists
    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res.status(400).json({ message: "Phone number already registered" });
    }

    // Upload to Cloudinary with proper error handling
    let cloudinaryResponse;
    try {
      cloudinaryResponse = await cloudinary.uploader.upload(
        photo.tempFilePath,
        {
          folder: "blog_app/users",
        }
      );
    } catch (cloudinaryError) {
      console.error("Cloudinary upload error:", cloudinaryError);
      return res.status(500).json({ 
        message: "Failed to upload image to cloud storage",
        error: cloudinaryError.message 
      });
    }

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      return res.status(500).json({ 
        message: "Image upload failed",
        error: cloudinaryResponse?.error?.message || "Unknown cloudinary error"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const newUser = new User({
      email,
      name,
      password: hashedPassword,
      phone,
      education,
      role,
      photo: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url || cloudinaryResponse.url,
      },
    });

    await newUser.save();

    // Generate token
    let token;
    try {
      token = await createTokenAndSaveCookies(newUser._id, res);
      console.log("Signup token: ", token);
    } catch (tokenError) {
      console.error("Token generation error:", tokenError);
      // Continue even if token generation fails, but log it
    }

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        education: newUser.education,
        photo: newUser.photo,
        phone: newUser.phone,
        createdAt: newUser.createdAt,
      },
      token: token,
    });

  } catch (error) {
    console.error("Registration error:", error);
    
    // Handle specific MongoDB errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: "Validation failed",
        errors: errors 
      });
    }
    
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({ 
        message: `${field} already exists` 
      });
    }

    return res.status(500).json({ 
      error: "Internal Server error",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const login = async (req, res) => {
  const { email, password, role } = req.body;
  
  try {
    if (!email || !password || !role) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const user = await User.findOne({ email }).select("+password");
    
    // Check if user exists
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if password exists
    if (!user.password) {
      return res.status(400).json({ message: "User password is missing" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check role
    if (user.role !== role) {
      return res.status(400).json({ 
        message: `User with email ${email} is not a ${role}` 
      });
    }

    // Generate token
    let token;
    try {
      token = await createTokenAndSaveCookies(user._id, res);
      console.log("Login token: ", token);
    } catch (tokenError) {
      console.error("Token generation error:", tokenError);
      return res.status(500).json({ message: "Failed to generate authentication token" });
    }

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        photo: user.photo,
      },
      token: token,
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ 
      error: "Internal Server error",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
    
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ 
      error: "Internal Server error",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json({ user });
  } catch (error) {
    console.error("Get profile error:", error);
    return res.status(500).json({ 
      error: "Internal Server error",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select('-password -token');
    res.status(200).json({ admins });
  } catch (error) {
    console.error("Get admins error:", error);
    return res.status(500).json({ 
      error: "Internal Server error",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// ✅ ADMIN: Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password -token");
    return res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

// ✅ ADMIN: Delete user (self delete blocked)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (String(req.user._id) === String(id)) {
      return res.status(403).json({ message: "Admin cannot delete own account" });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.deleteOne();
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

// ✅ ADMIN: Update role (self role change blocked)
export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (String(req.user._id) === String(id)) {
      return res.status(403).json({ message: "Admin cannot change own role" });
    }

    const updated = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    ).select("-password -token");

    if (!updated) return res.status(404).json({ message: "User not found" });

    return res
      .status(200)
      .json({ message: "User role updated", user: updated });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};