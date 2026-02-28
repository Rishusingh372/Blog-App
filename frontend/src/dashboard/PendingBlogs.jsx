// import axios from "axios";
// import { useEffect, useMemo, useState } from "react";
// import toast from "react-hot-toast";

// export default function PendingBlogs() {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [reason, setReason] = useState("");

//   const fetchAdminBlogs = async () => {
//     try {
//       const { data } = await axios.get(
//         "http://localhost:4001/api/blogs/admin/all",
//         { withCredentials: true }
//       );
//       setBlogs(data?.blogs || []);
//     } catch (e) {
//       toast.error(e?.response?.data?.message || "Failed to load blogs");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAdminBlogs();
//   }, []);

//   const pending = useMemo(
//     () => blogs.filter((b) => b.status === "pending"),
//     [blogs]
//   );

//   const approve = async (id) => {
//     try {
//       const { data } = await axios.put(
//         `http://localhost:4001/api/blogs/admin/approve/${id}`,
//         {},
//         { withCredentials: true }
//       );
//       toast.success(data?.message || "Approved");
//       setBlogs((prev) =>
//         prev.map((b) => (b._id === id ? { ...b, status: "approved" } : b))
//       );
//     } catch (e) {
//       toast.error(e?.response?.data?.message || "Approve failed");
//     }
//   };

//   const reject = async (id) => {
//     try {
//       const { data } = await axios.put(
//         `http://localhost:4001/api/blogs/admin/reject/${id}`,
//         { reason },
//         { withCredentials: true }
//       );
//       toast.success(data?.message || "Rejected");
//       setReason("");
//       setBlogs((prev) =>
//         prev.map((b) => (b._id === id ? { ...b, status: "rejected" } : b))
//       );
//     } catch (e) {
//       toast.error(e?.response?.data?.message || "Reject failed");
//     }
//   };

//   const remove = async (id) => {
//     try {
//       const { data } = await axios.delete(
//         `http://localhost:4001/api/blogs/delete/${id}`,
//         { withCredentials: true }
//       );
//       toast.success(data?.message || "Deleted");
//       setBlogs((prev) => prev.filter((b) => b._id !== id));
//     } catch (e) {
//       toast.error(e?.response?.data?.message || "Delete failed");
//     }
//   };

//   if (loading) return <div className="py-10 text-center">Loading...</div>;

//   if (!pending.length) {
//     return (
//       <div className="py-10 text-center">
//         <p className="font-semibold">No pending blogs 🎉</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-5">
//       <h2 className="text-xl font-bold">Pending Blogs</h2>

//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {pending.map((b) => (
//           <div key={b._id} className="border rounded-2xl overflow-hidden bg-white">
//             <img
//               src={b?.blogImage?.url || "/imgPL.webp"}
//               className="w-full h-40 object-cover"
//               alt={b?.title}
//             />
//             <div className="p-4 space-y-3">
//               <div className="flex items-center justify-between">
//                 <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 border">
//                   {b.category}
//                 </span>
//                 <span className="text-xs px-3 py-1 rounded-full bg-yellow-50 text-yellow-800 border">
//                   pending
//                 </span>
//               </div>

//               <h3 className="font-semibold">{b.title}</h3>
//               <p className="text-sm text-gray-600 line-clamp-2">{b.about}</p>

//               <input
//                 value={reason}
//                 onChange={(e) => setReason(e.target.value)}
//                 placeholder="Reject reason (optional)"
//                 className="w-full px-3 py-2 rounded-xl border"
//               />

//               <div className="flex gap-2">
//                 <button
//                   onClick={() => approve(b._id)}
//                   className="flex-1 px-4 py-2 rounded-xl bg-green-600 text-white"
//                 >
//                   Approve
//                 </button>
//                 <button
//                   onClick={() => reject(b._id)}
//                   className="flex-1 px-4 py-2 rounded-xl bg-yellow-500 text-white"
//                 >
//                   Reject
//                 </button>
//                 <button
//                   onClick={() => remove(b._id)}
//                   className="px-4 py-2 rounded-xl bg-red-50 border border-red-200 text-red-700"
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


import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL;

export default function PendingBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reasons, setReasons] = useState({}); // ✅ per-blog reason

  const API = import.meta.env.VITE_API_URL;

  const fetchAdminBlogs = async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/blogs/admin/all`,
        { withCredentials: true }
      );
      setBlogs(data?.blogs || []);
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminBlogs();
  }, []);

  const pending = useMemo(
    () => blogs.filter((b) => b.status === "pending"),
    [blogs]
  );

  const approve = async (id) => {
    try {
      const { data } = await axios.put(
        `${API}/api/blogs/admin/approve/${id}`,
        {},
        { withCredentials: true }
      );

      toast.success(data?.message || "Approved");

      setBlogs((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: "approved" } : b))
      );
    } catch (e) {
      toast.error(e?.response?.data?.message || "Approve failed");
    }
  };

  const reject = async (id) => {
    try {
      const { data } = await axios.put(
        `${API}/api/blogs/admin/reject/${id}`,
        { reason: reasons[id] || "" },
        { withCredentials: true }
      );

      toast.success(data?.message || "Rejected");

      setReasons((prev) => ({ ...prev, [id]: "" }));

      setBlogs((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: "rejected" } : b))
      );
    } catch (e) {
      toast.error(e?.response?.data?.message || "Reject failed");
    }
  };

  const remove = async (id) => {
    try {
      const { data } = await axios.delete(
        `${API}/api/blogs/delete/${id}`,
        { withCredentials: true }
      );

      toast.success(data?.message || "Deleted");
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (e) {
      toast.error(e?.response?.data?.message || "Delete failed");
    }
  };

  if (loading) return <div className="py-10 text-center">Loading...</div>;

  if (!pending.length) {
    return (
      <div className="py-10 text-center">
        <p className="font-semibold">No pending blogs 🎉</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold">Pending Blogs</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pending.map((b) => (
          <div
            key={b._id}
            className="border rounded-2xl overflow-hidden bg-white"
          >
            <img
              src={b?.blogImage?.url || "/imgPL.webp"}
              className="w-full h-40 object-cover"
              alt={b?.title}
            />

            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 border">
                  {b.category}
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-yellow-50 text-yellow-800 border">
                  pending
                </span>
              </div>

              <h3 className="font-semibold">{b.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{b.about}</p>

              <input
                value={reasons[b._id] || ""}
                onChange={(e) =>
                  setReasons((prev) => ({
                    ...prev,
                    [b._id]: e.target.value,
                  }))
                }
                placeholder="Reject reason (optional)"
                className="w-full px-3 py-2 rounded-xl border"
              />

              <div className="flex gap-2">
                <button
                  onClick={() => approve(b._id)}
                  className="flex-1 px-4 py-2 rounded-xl bg-green-600 text-white"
                >
                  Approve
                </button>

                <button
                  onClick={() => reject(b._id)}
                  className="flex-1 px-4 py-2 rounded-xl bg-yellow-500 text-white"
                >
                  Reject
                </button>

                <button
                  onClick={() => remove(b._id)}
                  className="px-4 py-2 rounded-xl bg-red-50 border border-red-200 text-red-700"
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