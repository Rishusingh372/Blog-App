import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function CreateBlog() {
  const navigateTo = useNavigate();
  const { fetchBlogs, fetchProfile } = useAuth();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");

  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");

  const [loading, setLoading] = useState(false);

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, PNG, WEBP allowed");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBlogImagePreview(reader.result);
      setBlogImage(file);
    };
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!category || !title || !about) {
      toast.error("Please fill all required fields");
      return;
    }

    if (about.length < 200) {
      toast.error("About should be at least 200 characters");
      return;
    }

    if (!blogImage) {
      toast.error("Blog image is required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    formData.append("blogImage", blogImage);

    try {
      setLoading(true);

      const token = localStorage.getItem("jwt");

      const { data } = await axios.post(
        "http://localhost:4001/api/blogs/create",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            // ✅ optional header (in case server reads Bearer token)
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        }
      );

      toast.success(data?.message || "Blog created");

      // ✅ refresh profile/blogs
      await fetchProfile();
      await fetchBlogs();

      // reset
      setTitle("");
      setCategory("");
      setAbout("");
      setBlogImage("");
      setBlogImagePreview("");

      // ✅ go to dashboard to see status
      navigateTo("/dashboard");
    } catch (error) {
      console.log(error);

      if (error?.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        navigateTo("/login");
        return;
      }

      if (error?.response?.status === 403) {
        toast.error(
          error?.response?.data?.message ||
            error?.response?.data?.error ||
            "Forbidden: Not allowed"
        );
        return;
      }

      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Create blog failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto my-10 p-4">
      <section className="max-w-2xl mx-auto bg-white border rounded-2xl p-6 shadow-sm">
        <h3 className="text-2xl font-bold mb-6">CREATE BLOG</h3>

        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block mb-2 font-semibold">Category</label>
            <select
              className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-200"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Devotion">Devotion</option>
              <option value="Sports">Sports</option>
              <option value="Coding">Coding</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Business">Business</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="BLOG MAIN TITLE"
            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-200"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div>
            <label className="block mb-2 font-semibold">BLOG IMAGE</label>
            <img
              src={
                blogImagePreview
                  ? blogImagePreview
                  : "/imgPL.webp"
              }
              alt="Blog Main"
              className="w-full h-56 object-cover mb-4 rounded-xl border"
            />
            <input
              type="file"
              className="w-full p-3 border rounded-xl"
              onChange={changePhotoHandler}
              accept="image/jpeg,image/png,image/webp"
            />
          </div>

          <textarea
            rows="7"
            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Write something about your blog (min 200 characters)"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-xl text-white font-semibold transition
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {loading ? "Publishing..." : "PUBLISH"}
          </button>

          <p className="text-xs text-gray-500 text-center">
            Note: If you are a <b>User</b>, your blog will be <b>Pending</b> until Admin approves it.
          </p>
        </form>
      </section>
    </div>
  );
}

export default CreateBlog;
