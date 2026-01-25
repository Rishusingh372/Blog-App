import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

const Register = () => {
  const { setIsAuthenticated, setProfile } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    education: "",
  });

  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle photo upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      toast.error("Only JPEG, PNG or WebP images allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  // Register user
  const handleRegister = async (e) => {
    e.preventDefault();

    const { name, email, phone, password, role, education } = formData;
    if (!name || !email || !phone || !password || !role || !education || !photo) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        submitData.append(key, value)
      );
      submitData.append("photo", photo);

      const { data } = await axios.post(
        "http://localhost:4001/api/users/register",
        submitData,
        {
          withCredentials: true,
        }
      );

      localStorage.setItem("jwt", data.token);
      setProfile(data);
      setIsAuthenticated(true);

      toast.success("Registration successful");
      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Create <span className="text-blue-600">Account</span>
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <select
            name="education"
            value={formData.education}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Education</option>
            <option value="BCA">BCA</option>
            <option value="MCA">MCA</option>
            <option value="B.Tech">B.Tech</option>
            <option value="M.Tech">M.Tech</option>
            <option value="Other">Other</option>
          </select>

          {/* Photo Upload */}
          <div className="flex items-center gap-4">
            <img
              src={preview || "/default-avatar.png"}
              alt="preview"
              className="w-16 h-16 rounded-full object-cover border"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
