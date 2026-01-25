import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <Link
      to={`/blog/${blog._id}`}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300"
    >
      {/* Image */}
      <div className="relative">
        <img
          src={blog?.blogImage?.url}
          alt={blog?.title}
          className="w-full h-52 object-cover group-hover:scale-105 transition duration-300"
        />
        <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
          {blog?.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="font-semibold text-lg line-clamp-2 group-hover:text-blue-600 transition">
          {blog?.title}
        </h2>

        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
          {blog?.about}
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 mt-4">
          <img
            src={blog?.adminPhoto}
            alt="author"
            className="w-9 h-9 rounded-full object-cover border"
          />
          <div>
            <p className="text-sm font-medium">{blog?.adminName}</p>
            <p className="text-xs text-gray-400">Author</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
