import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Hero = () => {
  const { blogs } = useAuth();

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-6">
      {blogs?.slice(0, 4).map((blog) => (
        <Link
          key={blog._id}
          to={`/blog/${blog._id}`}
          className="relative rounded-xl overflow-hidden group shadow"
        >
          <img
            src={blog.blogImage?.url}
            alt={blog.title}
            className="h-72 w-full object-cover group-hover:scale-110 transition"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="font-bold text-lg">{blog.title}</h2>
            <p className="text-xs text-gray-300">{blog.adminName}</p>
          </div>
        </Link>
      ))}
    </section>
  );
};

export default Hero;
