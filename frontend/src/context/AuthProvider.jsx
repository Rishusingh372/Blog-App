import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const API = import.meta.env.DEV
  ? ""
  : import.meta.env.VITE_API_URL || "https://blog-app-say8.onrender.com";

const axiosInstance = axios.create({
  baseURL: API,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [corsError, setCorsError] = useState(false);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("jwt");

      if (!token) {
        setIsAuthenticated(false);
        setProfile(null);
        return;
      }

      const { data } = await axiosInstance.get("/api/users/my-profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(data);
      setIsAuthenticated(true);
      setCorsError(false);
    } catch (error) {
      console.error("Profile fetch error:", error);

      if (error.code === "ERR_NETWORK" || error.message?.includes("CORS")) {
        setCorsError(true);
      }

      setIsAuthenticated(false);
      setProfile(null);
    }
  };

  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const { data } = await axiosInstance.get("/api/blogs/all", {
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {},
      });

      setBlogs(data?.blogs || []);
      setCorsError(false);
    } catch (error) {
      console.error("Blogs fetch error:", error);

      if (error.code === "ERR_NETWORK" || error.message?.includes("CORS")) {
        setCorsError(true);
      }

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
        corsError,
      }}
    >
      {children}
      {corsError && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            background: "#ef4444",
            color: "white",
            padding: "15px 25px",
            borderRadius: "8px",
            zIndex: 9999,
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            maxWidth: "300px",
          }}
        >
          <strong>CORS Error:</strong> Cannot connect to backend. Please check if the
          server is running and CORS is configured correctly.
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
