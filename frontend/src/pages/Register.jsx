import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Register() {
  const { isAuthenticated, setIsAuthenticated, setProfile } = useAuth();
  const navigateTo = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    education: "",
  });
  const [photo, setPhoto] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please select a valid image file (JPEG, PNG, or WebP)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhotoPreview(reader.result);
      setPhoto(file);
      // Clear photo error if any
      setErrors(prev => ({ ...prev, photo: "" }));
    };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (formData.phone.length < 10) newErrors.phone = "Phone number must be at least 10 digits";
    
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    
    if (!formData.role) newErrors.role = "Role is required";
    if (!formData.education) newErrors.education = "Education is required";
    if (!photo) newErrors.photo = "Profile photo is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    setIsLoading(true);

    const submitData = new FormData();
    submitData.append("name", formData.name.trim());
    submitData.append("email", formData.email.trim());
    submitData.append("phone", formData.phone);
    submitData.append("password", formData.password);
    submitData.append("role", formData.role);
    submitData.append("education", formData.education);
    submitData.append("photo", photo);

    try {
      const { data } = await axios.post(
        "http://localhost:4001/api/users/register",
        submitData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 30000, // 30 seconds timeout
        }
      );
      
      console.log(data);
      localStorage.setItem("jwt", data.token);
      toast.success(data.message || "User registered successfully");
      setProfile(data);
      setIsAuthenticated(true);
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "",
        education: "",
      });
      setPhoto("");
      setPhotoPreview("");
      setErrors({});
      
      navigateTo("/");
      
    } catch (error) {
      console.error("Registration error:", error);
      
      if (error.code === 'ERR_NETWORK' || !error.response) {
        toast.error("Server is not reachable. Please check your connection and try again.");
      } else if (error.response?.data?.message) {
        // Show specific backend error message
        toast.error(error.response.data.message);
        
        // Set field-specific errors if available
        if (error.response.data.errors) {
          setErrors(error.response.data.errors);
        }
      } else if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else if (error.response?.status === 413) {
        toast.error("File size too large. Please select a smaller image.");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 mx-4">
          <form onSubmit={handleRegister}>
            <div className="font-semibold text-2xl items-center text-center mb-6">
              Cilli<span className="text-blue-500">Blog</span>
            </div>
            <h1 className="text-2xl font-semibold mb-6 text-center">Create Account</h1>
            
            {/* Role Field */}
            <div className="mb-4">
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.role ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Role *</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
            </div>

            {/* Name Field */}
            <div className="mb-4">
              <input
                type="text"
                name="name"
                placeholder="Your Full Name *"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Your Email Address *"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Phone Field */}
            <div className="mb-4">
              <input
                type="number"
                name="phone"
                placeholder="Your Phone Number *"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <input
                type="password"
                name="password"
                placeholder="Your Password *"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Education Field */}
            <div className="mb-4">
              <select
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.education ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Your Education *</option>
                <option value="BCA">BCA</option>
                <option value="MCA">MCA</option>
                <option value="MBA">MBA</option>
                <option value="BBA">BBA</option>
                <option value="B.Tech">B.Tech</option>
                <option value="M.Tech">M.Tech</option>
                <option value="Other">Other</option>
              </select>
              {errors.education && <p className="text-red-500 text-sm mt-1">{errors.education}</p>}
            </div>

            {/* Photo Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Photo *
              </label>
              <div className="flex items-center space-x-4">
                <div className="photo w-20 h-20 flex-shrink-0">
                  <img
                    src={photoPreview || "/default-avatar.png"}
                    alt="Profile preview"
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={changePhotoHandler}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Supported formats: JPEG, PNG, WebP (Max 5MB)
                  </p>
                </div>
              </div>
              {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo}</p>}
            </div>

            <p className="text-center mb-4">
              Already registered?{" "}
              <Link to={"/login"} className="text-blue-600 hover:text-blue-800 font-medium">
                Login Now
              </Link>
            </p>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full p-3 rounded-md text-white font-medium transition duration-300 ${
                isLoading 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Registering...
                </div>
              ) : (
                "Register"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;