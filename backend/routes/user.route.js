import express from "express";
import {
  getAdmins,
  getMyProfile,
  login,
  logout,
  register,
  getAllUsers,
  deleteUser,
  updateUserRole,
} from "../controller/user.controller.js";

import { isAuthenticated, isAdmin } from "../middleware/authUser.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/my-profile", isAuthenticated, getMyProfile);
router.get("/admins", getAdmins);

// ✅ ADMIN USERS CRUD
router.get("/admin/users", isAuthenticated, isAdmin("admin"), getAllUsers);
router.delete("/admin/users/:id", isAuthenticated, isAdmin("admin"), deleteUser);
router.put(
  "/admin/users/:id/role",
  isAuthenticated,
  isAdmin("admin"),
  updateUserRole
);

export default router;
