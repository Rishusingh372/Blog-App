import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

import Sidebar from "../dashboard/Sidebar";
import MyProfile from "../dashboard/MyProfile";
import MyBlogs from "../dashboard/MyBlogs";
import CreateBlog from "../dashboard/CreateBlog";
import PendingBlogs from "../dashboard/PendingBlogs";
import UsersManager from "../dashboard/UsersManager";

export default function Dashboard() {
  const { isAuthenticated, profile } = useAuth();
  const [component, setComponent] = useState("My Blogs");

  if (!isAuthenticated) return <Navigate to="/login" />;

  const role = profile?.user?.role;

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar component={component} setComponent={setComponent} />

      <div className="md:ml-[280px] p-4 md:p-8">
        <div className="bg-white border rounded-2xl shadow-sm p-5">
          {component === "My Profile" ? (
            <MyProfile />
          ) : component === "Create Blog" ? (
            <CreateBlog />
          ) : component === "Pending Blogs" && role === "admin" ? (
            <PendingBlogs />
          ) : component === "Users" && role === "admin" ? (
            <UsersManager />
          ) : (
            <MyBlogs />
          )}
        </div>
      </div>
    </div>
  );
}
