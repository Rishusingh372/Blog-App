import axios from "axios";
import React, { useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

function Navbar() {
  const navigateTo = useNavigate();
  const { isAuthenticated, profile, setIsAuthenticated, setProfile } = useAuth();
  const [open, setOpen] = useState(false);

  const user = profile?.user;
  const role = user?.role;

  const navClass = useMemo(
    () => (isActive) =>
      `px-4 py-2 rounded-xl text-sm font-semibold transition ${
        isActive
          ? "bg-blue-600 text-white"
          : "text-gray-700 hover:bg-gray-100"
      }`,
    []
  );

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:4001/api/users/logout", {
        withCredentials: true,
      });

      localStorage.removeItem("jwt");
      setIsAuthenticated(false);
      setProfile(null);

      toast.success("Logged out");
      navigateTo("/login");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black">
            CB
          </div>
          <div className="leading-tight">
            <p className="font-extrabold text-gray-900">
              Cilli<span className="text-blue-600">Blog</span>
            </p>
            <p className="text-xs text-gray-500 -mt-1">Write • Share • Grow</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2">
          <NavLink to="/" className={({ isActive }) => navClass(isActive)}>
            Home
          </NavLink>
          <NavLink to="/blogs" className={({ isActive }) => navClass(isActive)}>
            Blogs
          </NavLink>
          <NavLink to="/creators" className={({ isActive }) => navClass(isActive)}>
            Creators
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => navClass(isActive)}>
            About
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => navClass(isActive)}>
            Contact
          </NavLink>
        </nav>

        {/* Right section */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {/* User mini profile */}
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition"
              >
                <img
                  src={user?.photo?.url || "/default-avatar.png"}
                  alt="avatar"
                  className="w-9 h-9 rounded-full object-cover border"
                />
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-gray-900 line-clamp-1">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500">{role || "user"}</p>
                </div>
              </Link>

              <Link
                to="/dashboard"
                className="px-4 py-2 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-black transition"
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl border text-sm font-semibold hover:bg-gray-50 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl border text-sm font-semibold hover:bg-gray-50 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border hover:bg-gray-50"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle Menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="container mx-auto px-4 py-4 space-y-2">
            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className={({ isActive }) => navClass(isActive)}
            >
              Home
            </NavLink>
            <NavLink
              to="/blogs"
              onClick={() => setOpen(false)}
              className={({ isActive }) => navClass(isActive)}
            >
              Blogs
            </NavLink>
            <NavLink
              to="/creators"
              onClick={() => setOpen(false)}
              className={({ isActive }) => navClass(isActive)}
            >
              Creators
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setOpen(false)}
              className={({ isActive }) => navClass(isActive)}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setOpen(false)}
              className={({ isActive }) => navClass(isActive)}
            >
              Contact
            </NavLink>

            <div className="pt-3 border-t">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <Link
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                    className="block w-full px-4 py-3 rounded-xl bg-gray-900 text-white text-sm font-semibold text-center"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={() => {
                      setOpen(false);
                      handleLogout();
                    }}
                    className="w-full px-4 py-3 rounded-xl border text-sm font-semibold hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="block w-full px-4 py-3 rounded-xl border text-sm font-semibold text-center hover:bg-gray-50"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="block w-full px-4 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold text-center hover:bg-blue-700"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
