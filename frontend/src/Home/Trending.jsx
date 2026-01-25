import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Trending = () => {
  const { blogs } = useAuth();

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {blogs?.slice(0, 5).map((blog) => (
        <Link
          to={`/blog/${blog._id}`}
          key={blog._id}
          className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
        >
          <img
            src={blog.blogImage?.url}
            alt={blog.title}
            className="h-40 w-full object-cover"
          />
          <div className="p-4">
            <span className="text-xs text-blue-600 font-medium">
              {blog.category}
            </span>
            <h3 className="font-semibold text-sm mt-1 line-clamp-2">
              {blog.title}
            </h3>
            <div className="flex items-center mt-3">
              <img
                src={blog.adminPhoto}
                className="w-8 h-8 rounded-full"
                alt=""
              />
              <p className="ml-2 text-xs text-gray-500">
                {blog.adminName}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Trending;
