import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthProvider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Register() {
  const { setIsAuthenticated, setProfile } = useAuth();
  const navigateTo = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
    education: "",
  });

  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const changePhotoHandler = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Select a valid image (JPEG, PNG, WebP)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhotoPreview(reader.result);
      setPhoto(file);
      setErrors((prev) => ({ ...prev, photo: "" }));
    };
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Invalid email";

    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    else if (formData.phone.length < 10)
      newErrors.phone = "Phone must be at least 10 digits";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";

    if (!formData.education) newErrors.education = "Education is required";
    if (!formData.role) newErrors.role = "Role is required";
    if (!photo) newErrors.photo = "Profile photo is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill all fields correctly");
      return;
    }

    const submitData = new FormData();
    submitData.append("name", formData.name.trim());
    submitData.append("email", formData.email.trim());
    submitData.append("phone", formData.phone);
    submitData.append("password", formData.password);
    submitData.append("role", formData.role);
    submitData.append("education", formData.education);
    submitData.append("photo", photo);

    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:4001/api/users/register",
        submitData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 30000,
        }
      );

      localStorage.setItem("jwt", data.token);
      setProfile(data);
      setIsAuthenticated(true);

      toast.success(data.message || "Registered successfully ✅");
      navigateTo("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4 py-10">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.55 }}
        className="w-full max-w-md bg-white border rounded-2xl shadow-sm p-8"
      >
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mt-4">
            Create Account
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Join and start publishing blogs.
          </p>
        </div>

        <form onSubmit={handleRegister} className="mt-7 space-y-4">
          {/* Role */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className={`mt-2 w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-200 ${
                errors.role ? "border-red-400" : "border-gray-200"
              }`}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && <p className="text-xs text-red-500 mt-1">{errors.role}</p>}
          </div>

          {/* Name */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={formData.name}
              onChange={handleInputChange}
              className={`mt-2 w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-200 ${
                errors.name ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleInputChange}
              className={`mt-2 w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-200 ${
                errors.email ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Phone</label>
            <input
              type="number"
              name="phone"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleInputChange}
              className={`mt-2 w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-200 ${
                errors.phone ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="At least 8 characters"
              value={formData.password}
              onChange={handleInputChange}
              className={`mt-2 w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-200 ${
                errors.password ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Education */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Education</label>
            <select
              name="education"
              value={formData.education}
              onChange={handleInputChange}
              className={`mt-2 w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-200 ${
                errors.education ? "border-red-400" : "border-gray-200"
              }`}
            >
              <option value="">Select your education</option>
              <option value="BCA">BCA</option>
              <option value="MCA">MCA</option>
              <option value="MBA">MBA</option>
              <option value="BBA">BBA</option>
              <option value="B.Tech">B.Tech</option>
              <option value="M.Tech">M.Tech</option>
              <option value="Other">Other</option>
            </select>
            {errors.education && (
              <p className="text-xs text-red-500 mt-1">{errors.education}</p>
            )}
          </div>

          {/* Photo */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Profile Photo
            </label>

            <div className="mt-2 flex items-center gap-4">
              <img
                src={photoPreview || "/default-avatar.png"}
                alt="preview"
                className="w-16 h-16 rounded-full object-cover border"
              />
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={changePhotoHandler}
                className="w-full text-sm"
              />
            </div>

            {errors.photo && <p className="text-xs text-red-500 mt-1">{errors.photo}</p>}
            <p className="text-xs text-gray-500 mt-1">
              JPEG/PNG/WebP only (Max 5MB)
            </p>
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.01 }}
            disabled={loading}
            type="submit"
            className={`w-full py-3 rounded-xl font-semibold text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Creating..." : "Create Account"}
          </motion.button>

          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
    <Footer/>
    </>
  );
}

export default Register;
