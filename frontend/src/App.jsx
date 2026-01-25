import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";

import Blogs from "./pages/Blogs";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Creators from "./pages/Creators";
import Detail from "./pages/Detail";
import NotFound from "./pages/NotFound";

import UpdateBlog from "./dashboard/UpdateBlog";
import { useAuth } from "./context/AuthProvider";

// ✅ Protected Route (login required)
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("jwt");
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

// ✅ Admin-only Route (optional)
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("jwt");
  const { profile } = useAuth();

  if (!token) return <Navigate to="/login" replace />;

  if (profile?.user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  const location = useLocation();

  // ✅ hide navbar/footer on these pages
  const hideNavbarFooter = ["/dashboard", "/login", "/register"].includes(
    location.pathname
  );

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavbarFooter && <Navbar />}

      <div className="flex-1">
        <Routes>
          {/* ✅ Public Home (default) */}
          <Route path="/" element={<Home />} />

          {/* ✅ Public pages */}
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/creators" element={<Creators />} />

          {/* ✅ Auth pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ✅ Public single blog */}
          <Route path="/blog/:id" element={<Detail />} />

          {/* ✅ Protected: dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* ✅ Protected: update blog (user own pending OR admin any) */}
          <Route
            path="/blog/update/:id"
            element={
              <ProtectedRoute>
                <UpdateBlog />
              </ProtectedRoute>
            }
          />

          {/* ✅ (Optional) Admin-only example route
              अगर तुम future में admin-only pages बनाओ तो ऐसे wrap करना
          */}
          {/* 
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            }
          /> 
          */}

          {/* ✅ 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Toaster />
      {!hideNavbarFooter && <Footer />}
    </div>
  );
}

export default App;
