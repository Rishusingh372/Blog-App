// import axios from "axios";
// import React, { createContext, useContext, useEffect, useState } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [blogs, setBlogs] = useState([]);
//   const [profile, setProfile] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const fetchProfile = async () => {
//     try {
//       const token = localStorage.getItem("jwt");
//       if (!token) {
//         setIsAuthenticated(false);
//         setProfile(null);
//         return;
//       }

//       const { data } = await axios.get(
//         "http://localhost:4001/api/users/my-profile",
//         {
//           withCredentials: true,
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       setProfile(data);
//       setIsAuthenticated(true);
//     } catch (error) {
//       setIsAuthenticated(false);
//       setProfile(null);
//     }
//   };

//   const fetchBlogs = async () => {
//     try {
//       const { data } = await axios.get("http://localhost:4001/api/blogs/all", {
//         withCredentials: true,
//       });
//       setBlogs(data?.blogs || []);
//     } catch (error) {
//       setBlogs([]);
//     }
//   };

//   useEffect(() => {
//     fetchBlogs();
//     fetchProfile();
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         blogs,
//         setBlogs,
//         profile,
//         setProfile,
//         isAuthenticated,
//         setIsAuthenticated,
//         fetchBlogs,
//         fetchProfile,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);




import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const API = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ fetch profile
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("jwt");

      if (!token) {
        setIsAuthenticated(false);
        setProfile(null);
        return;
      }

      const { data } = await axios.get(
        `${API}/api/users/my-profile`,
        {
          withCredentials: true,
        }
      );

      setProfile(data);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      setProfile(null);
    }
  };

  // ✅ fetch blogs
  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/blogs/all`,
        { withCredentials: true }
      );

      setBlogs(data?.blogs || []);
    } catch (error) {
      setBlogs([]);
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        blogs,
        setBlogs,
        profile,
        setProfile,
        isAuthenticated,
        setIsAuthenticated,
        fetchBlogs,
        fetchProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);