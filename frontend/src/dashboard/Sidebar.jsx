// import axios from "axios";
// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthProvider";
// import { BiSolidLeftArrowAlt } from "react-icons/bi";
// import { CiMenuBurger } from "react-icons/ci";

// function Sidebar({ component, setComponent }) {
//   const { profile, setIsAuthenticated, setProfile } = useAuth();
//   const [show, setShow] = useState(false);
//   const navigateTo = useNavigate();

//   const role = profile?.user?.role;

//   const handleComponents = (value) => {
//     setComponent(value);
//   };

//   const gotoHome = () => navigateTo("/");

//   const handleLogout = async () => {
//     try {
//       const { data } = await axios.get(
//         "http://localhost:4001/api/users/logout",
//         { withCredentials: true }
//       );
//       localStorage.removeItem("jwt");
//       setIsAuthenticated(false);
//       setProfile(null);
//       toast.success(data?.message || "Logged out");
//       navigateTo("/login");
//     } catch (error) {
//       toast.error("Failed to logout");
//     }
//   };

//   return (
//     <>
//       {/* Mobile */}
//       <div className="md:hidden p-3">
//         <button
//           className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-white"
//           onClick={() => setShow(true)}
//         >
//           <CiMenuBurger />
//           Menu
//         </button>
//       </div>

//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-full w-64 bg-white border shadow-lg p-6 z-50 transform transition-transform duration-300
//           ${show ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
//       >
//         <div
//           className="sm:hidden absolute top-4 right-4 text-xl cursor-pointer"
//           onClick={() => setShow(false)}
//         >
//           <BiSolidLeftArrowAlt className="text-2xl" />
//         </div>

//         <div className="text-center mb-6">
//           <img
//             className="w-24 h-24 rounded-full mx-auto mb-2 object-cover border"
//             src={profile?.user?.photo?.url || "/default-avatar.png"}
//             alt=""
//           />
//           <p className="text-lg font-semibold">{profile?.user?.name}</p>
//           <p className="text-xs text-gray-500">{role}</p>
//         </div>

//         <ul className="space-y-4">
//           <button
//             onClick={() => handleComponents("My Blogs")}
//             className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
//           >
//             MY BLOGS
//           </button>

//           <button
//             onClick={() => handleComponents("Create Blog")}
//             className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
//           >
//             CREATE BLOG
//           </button>

//           {/* ✅ Admin only */}
//           {role === "admin" && (
//             <>
//               <button
//                 onClick={() => handleComponents("Pending Blogs")}
//                 className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700"
//               >
//                 PENDING BLOGS
//               </button>

//               <button
//                 onClick={() => handleComponents("Users")}
//                 className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-800"
//               >
//                 USERS
//               </button>
//             </>
//           )}

//           <button
//             onClick={() => handleComponents("My Profile")}
//             className="w-full px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-700"
//           >
//             MY PROFILE
//           </button>

//           <button
//             onClick={gotoHome}
//             className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
//           >
//             HOME
//           </button>

//           <button
//             onClick={handleLogout}
//             className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black"
//           >
//             LOGOUT
//           </button>
//         </ul>
//       </div>
//     </>
//   );
// }

// export default Sidebar;

import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { BiSolidLeftArrowAlt } from "react-icons/bi";
import { CiMenuBurger } from "react-icons/ci";

const API = import.meta.env.VITE_API_URL; // ✅ env use

function Sidebar({ component, setComponent }) {
  const { profile, setIsAuthenticated, setProfile } = useAuth();
  const [show, setShow] = useState(false);
  const navigateTo = useNavigate();

  const role = profile?.user?.role;

  const handleComponents = (value) => {
    setComponent(value);
    setShow(false); // ✅ mobile me auto close
  };

  const gotoHome = () => navigateTo("/");

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/users/logout`,
        { withCredentials: true }
      );

      localStorage.removeItem("jwt");
      setIsAuthenticated(false);
      setProfile(null);
      toast.success(data?.message || "Logged out");
      navigateTo("/login");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to logout");
    }
  };

  return (
    <>
      {/* Mobile */}
      <div className="md:hidden p-3">
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-white"
          onClick={() => setShow(true)}
        >
          <CiMenuBurger />
          Menu
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white border shadow-lg p-6 z-50 transform transition-transform duration-300
          ${show ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div
          className="sm:hidden absolute top-4 right-4 text-xl cursor-pointer"
          onClick={() => setShow(false)}
        >
          <BiSolidLeftArrowAlt className="text-2xl" />
        </div>

        <div className="text-center mb-6">
          <img
            className="w-24 h-24 rounded-full mx-auto mb-2 object-cover border"
            src={profile?.user?.photo?.url || "/default-avatar.png"}
            alt=""
          />
          <p className="text-lg font-semibold">{profile?.user?.name}</p>
          <p className="text-xs text-gray-500">{role}</p>
        </div>

        <ul className="space-y-4">
          <button
            onClick={() => handleComponents("My Blogs")}
            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
          >
            MY BLOGS
          </button>

          <button
            onClick={() => handleComponents("Create Blog")}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
          >
            CREATE BLOG
          </button>

          {role === "admin" && (
            <>
              <button
                onClick={() => handleComponents("Pending Blogs")}
                className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700"
              >
                PENDING BLOGS
              </button>

              <button
                onClick={() => handleComponents("Users")}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-800"
              >
                USERS
              </button>
            </>
          )}

          <button
            onClick={() => handleComponents("My Profile")}
            className="w-full px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-700"
          >
            MY PROFILE
          </button>

          <button
            onClick={gotoHome}
            className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
          >
            HOME
          </button>

          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black"
          >
            LOGOUT
          </button>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;