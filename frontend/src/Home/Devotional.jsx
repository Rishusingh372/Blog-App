import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Devotional = () => {
  const { blogs } = useAuth();
  const devotionalBlogs = blogs?.filter(
    (blog) => blog.category === "Devotion"
  );

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {devotionalBlogs?.slice(0, 4).map((blog) => (
        <Link
          key={blog._id}
          to={`/blog/${blog._id}`}
          className="group rounded-xl overflow-hidden shadow hover:shadow-lg transition"
        >
          <div className="relative">
            <img
              src={blog.blogImage?.url}
              alt={blog.title}
              className="h-48 w-full object-cover group-hover:scale-105 transition"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <h3 className="absolute bottom-4 left-4 text-white font-semibold">
              {blog.title}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Devotional;
