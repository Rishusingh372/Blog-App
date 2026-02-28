// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { Link } from "react-router-dom";

// function MyBlogs() {
//   const [myBlogs, setMyBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMyBlogs = async () => {
//       try {
//         const { data } = await axios.get(
//           "http://localhost:4001/api/blogs/my-blog",
//           { withCredentials: true }
//         );
//         setMyBlogs(data || []);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMyBlogs();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       const res = await axios.delete(
//         `http://localhost:4001/api/blogs/delete/${id}`,
//         { withCredentials: true }
//       );
//       toast.success(res.data?.message || "Blog deleted");
//       setMyBlogs((prev) => prev.filter((b) => b._id !== id));
//     } catch (error) {
//       toast.error("Failed to delete blog");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="py-10 text-center text-gray-500">Loading your blogs...</div>
//     );
//   }

//   if (!myBlogs?.length) {
//     return (
//       <div className="py-10 text-center">
//         <p className="text-gray-600 font-semibold">
//           You haven’t posted any blog yet.
//         </p>
//         <p className="text-gray-500 text-sm mt-1">
//           Go to “Create Blog” and publish your first post.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {myBlogs.map((blog) => (
//           <div
//             key={blog._id}
//             className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
//           >
//             <img
//               src={blog?.blogImage?.url || "/imgPL.webp"}
//               alt="blog"
//               className="w-full h-44 object-cover"
//             />
//             <div className="p-4">
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
//                   {blog.category}
//                 </span>
//               </div>

//               <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
//                 {blog.title}
//               </h3>

//               <div className="flex gap-3 mt-4">
//                 <Link
//                   to={`/blog/update/${blog._id}`}
//                   className="flex-1 text-center px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition text-sm font-semibold"
//                 >
//                   Update
//                 </Link>
//                 <button
//                   onClick={() => handleDelete(blog._id)}
//                   className="flex-1 px-4 py-2 rounded-xl border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 transition text-sm font-semibold"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default MyBlogs;




import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function MyBlogs() {
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/blogs/my-blog`,
          { withCredentials: true }
        );
        setMyBlogs(data || []);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load your blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/blogs/delete/${id}`,
        { withCredentials: true }
      );

      toast.success(res.data?.message || "Blog deleted");
      setMyBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Failed to delete blog"
      );
    }
  };

  if (loading) {
    return (
      <div className="py-10 text-center text-gray-500">
        Loading your blogs...
      </div>
    );
  }

  if (!myBlogs?.length) {
    return (
      <div className="py-10 text-center">
        <p className="text-gray-600 font-semibold">
          You haven’t posted any blog yet.
        </p>
        <p className="text-gray-500 text-sm mt-1">
          Go to “Create Blog” and publish your first post.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {myBlogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
          >
            <img
              src={blog?.blogImage?.url || "/imgPL.webp"}
              alt="blog"
              className="w-full h-44 object-cover"
            />

            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                  {blog.category}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                {blog.title}
              </h3>

              <div className="flex gap-3 mt-4">
                <Link
                  to={`/blog/update/${blog._id}`}
                  className="flex-1 text-center px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition text-sm font-semibold"
                >
                  Update
                </Link>

                <button
                  onClick={() => handleDelete(blog._id)}
                  className="flex-1 px-4 py-2 rounded-xl border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 transition text-sm font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBlogs;