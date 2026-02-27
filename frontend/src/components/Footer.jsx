import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black">
                CB
              </div>
              <p className="font-extrabold text-gray-900">
                Cilli<span className="text-blue-600">Blog</span>
              </p>
            </div>
            <p className="text-sm text-gray-600 mt-3 leading-6">
              A simple blogging platform where users can publish blogs and
              admins can approve them to keep content quality high.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gray-900">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link className="text-gray-600 hover:text-gray-900" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="text-gray-600 hover:text-gray-900" to="/blogs">
                  Blogs
                </Link>
              </li>
              <li>
                <Link className="text-gray-600 hover:text-gray-900" to="/creators">
                  Creators
                </Link>
              </li>
              <li>
                <Link className="text-gray-600 hover:text-gray-900" to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="text-gray-600 hover:text-gray-900" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-gray-900">Contact</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>Email: rishu272018@gmail.com</li>
              <li>Location: Bhopal, MP, India</li>
              <li className="text-xs text-gray-500">
                Built with React + Tailwind + Node + MongoDB
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-600">
            © {year} CilliBlog. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Built with React + Tailwind + Node + MongoDB
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
