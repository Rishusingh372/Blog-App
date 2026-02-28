// import axios from "axios";
// import { useEffect, useMemo, useState } from "react";
// import toast from "react-hot-toast";
// import { useAuth } from "../context/AuthProvider";

// export default function UsersManager() {
//   const { profile } = useAuth();
//   const myId = profile?.user?._id;

//   const [users, setUsers] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);

//   const fetchUsers = async () => {
//     try {
//       const { data } = await axios.get(
//         "http://localhost:4001/api/users/admin/users",
//         { withCredentials: true }
//       );
//       setUsers(data?.users || []);
//     } catch (e) {
//       toast.error(e?.response?.data?.message || "Failed to load users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const filtered = useMemo(() => {
//     const q = search.trim().toLowerCase();
//     if (!q) return users;
//     return users.filter((u) => {
//       return (
//         (u?.name || "").toLowerCase().includes(q) ||
//         (u?.email || "").toLowerCase().includes(q) ||
//         (u?.role || "").toLowerCase().includes(q)
//       );
//     });
//   }, [users, search]);

//   const changeRole = async (id, role) => {
//     try {
//       const { data } = await axios.put(
//         `http://localhost:4001/api/users/admin/users/${id}/role`,
//         { role },
//         { withCredentials: true }
//       );
//       toast.success(data?.message || "Role updated");
//       setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, role } : u)));
//     } catch (e) {
//       toast.error(e?.response?.data?.message || "Role update failed");
//     }
//   };

//   const deleteUser = async (id) => {
//     try {
//       const { data } = await axios.delete(
//         `http://localhost:4001/api/users/admin/users/${id}`,
//         { withCredentials: true }
//       );
//       toast.success(data?.message || "User deleted");
//       setUsers((prev) => prev.filter((u) => u._id !== id));
//     } catch (e) {
//       toast.error(e?.response?.data?.message || "Delete failed");
//     }
//   };

//   if (loading) return <div className="py-10 text-center">Loading users...</div>;

//   return (
//     <div className="space-y-4">
//       <h2 className="text-xl font-bold">Users</h2>

//       <input
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         placeholder="Search name/email/role..."
//         className="w-full px-4 py-3 rounded-xl border"
//       />

//       <div className="overflow-x-auto border rounded-2xl bg-white">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-50 border-b">
//             <tr className="text-left">
//               <th className="p-3">Name</th>
//               <th className="p-3">Email</th>
//               <th className="p-3">Role</th>
//               <th className="p-3">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filtered.map((u) => (
//               <tr key={u._id} className="border-b last:border-b-0">
//                 <td className="p-3">{u?.name}</td>
//                 <td className="p-3">{u?.email}</td>
//                 <td className="p-3">
//                   <select
//                     value={u?.role}
//                     onChange={(e) => changeRole(u._id, e.target.value)}
//                     disabled={String(myId) === String(u._id)}
//                     className="px-3 py-2 rounded-xl border"
//                   >
//                     <option value="user">user</option>
//                     <option value="admin">admin</option>
//                   </select>
//                 </td>
//                 <td className="p-3">
//                   <button
//                     disabled={String(myId) === String(u._id)}
//                     onClick={() => deleteUser(u._id)}
//                     className={`px-4 py-2 rounded-xl border font-semibold
//                       ${
//                         String(myId) === String(u._id)
//                           ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
//                           : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
//                       }`}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}

//             {!filtered.length && (
//               <tr>
//                 <td className="p-6 text-center text-gray-500" colSpan="4">
//                   No users found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }




import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

const API = import.meta.env.VITE_API_URL;

export default function UsersManager() {
  const { profile } = useAuth();
  const myId = profile?.user?._id;

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ fetch users
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/users/admin/users`,
        { withCredentials: true }
      );
      setUsers(data?.users || []);
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ search filter
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return users;

    return users.filter((u) => {
      return (
        (u?.name || "").toLowerCase().includes(q) ||
        (u?.email || "").toLowerCase().includes(q) ||
        (u?.role || "").toLowerCase().includes(q)
      );
    });
  }, [users, search]);

  // ✅ change role
  const changeRole = async (id, role) => {
    try {
      const { data } = await axios.put(
        `${API}/api/users/admin/users/${id}/role`,
        { role },
        { withCredentials: true }
      );

      toast.success(data?.message || "Role updated");

      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, role } : u))
      );
    } catch (e) {
      toast.error(e?.response?.data?.message || "Role update failed");
    }
  };

  // ✅ delete user
  const deleteUser = async (id) => {
    try {
      const { data } = await axios.delete(
        `${API}/api/users/admin/users/${id}`,
        { withCredentials: true }
      );

      toast.success(data?.message || "User deleted");

      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (e) {
      toast.error(e?.response?.data?.message || "Delete failed");
    }
  };

  if (loading)
    return <div className="py-10 text-center">Loading users...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Users</h2>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search name/email/role..."
        className="w-full px-4 py-3 rounded-xl border"
      />

      <div className="overflow-x-auto border rounded-2xl bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr className="text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((u) => {
              const isMe = String(myId) === String(u._id);

              return (
                <tr key={u._id} className="border-b last:border-b-0">
                  <td className="p-3">{u?.name}</td>
                  <td className="p-3">{u?.email}</td>

                  <td className="p-3">
                    <select
                      value={u?.role}
                      onChange={(e) =>
                        changeRole(u._id, e.target.value)
                      }
                      disabled={isMe}
                      className="px-3 py-2 rounded-xl border"
                    >
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                  </td>

                  <td className="p-3">
                    <button
                      disabled={isMe}
                      onClick={() => deleteUser(u._id)}
                      className={`px-4 py-2 rounded-xl border font-semibold
                        ${
                          isMe
                            ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                            : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                        }`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}

            {!filtered.length && (
              <tr>
                <td className="p-6 text-center text-gray-500" colSpan="4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}