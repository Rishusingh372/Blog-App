import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthProvider";
import {
  FaCode,
  FaDatabase,
  FaLaptopCode,
  FaRocket,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";

function About() {
  const { profile } = useAuth();
  const name = profile?.user?.name || "Developer";

  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
  };

  const cards = [
    {
      icon: <FaLaptopCode />,
      title: "Frontend",
      desc: "React.js, Tailwind CSS, responsive UI, reusable components, clean layouts.",
    },
    {
      icon: <FaDatabase />,
      title: "Backend",
      desc: "Node.js, Express.js, REST APIs, authentication, authorization, middleware.",
    },
    {
      icon: <FaCode />,
      title: "Database",
      desc: "MongoDB + Mongoose schema design, relations, validation, pagination patterns.",
    },
    {
      icon: <FaRocket />,
      title: "Deployment & Practices",
      desc: "Environment variables, error handling (401/403/404), clean code, readable structure.",
    },
  ];

  const highlights = [
    "Built a MERN blogging platform with role-based access (User/Admin).",
    "Implemented JWT authentication + protected routes.",
    "Created an admin approval workflow for publishing user blogs.",
    "Designed modern UI with Tailwind + loading/error states.",
    "Integrated image upload (Cloudinary-ready) and secure handling.",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Hero */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.55 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            About <span className="text-blue-600">{name}</span>
          </h1>
          <p className="text-gray-600 mt-3 leading-7">
            I’m a MERN stack developer who enjoys building clean, responsive, and
            user-friendly web applications. I focus on real-world features like
            authentication, role-based access, and admin moderation workflows.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.55, delay: 0.1 }}
          className="max-w-5xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <div className="bg-white border rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-gray-500">Core Stack</p>
            <p className="text-xl font-bold text-gray-900 mt-1">MERN</p>
          </div>
          <div className="bg-white border rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-gray-500">Focus</p>
            <p className="text-xl font-bold text-gray-900 mt-1">
              Auth + Admin Systems
            </p>
          </div>
          <div className="bg-white border rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-gray-500">UI Style</p>
            <p className="text-xl font-bold text-gray-900 mt-1">
              Clean + Responsive
            </p>
          </div>
        </motion.div>

        {/* Skills Cards */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.55, delay: 0.2 }}
          className="max-w-6xl mx-auto mt-10"
        >
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-5">
            Technical Expertise
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {cards.map((c) => (
              <motion.div
                key={c.title}
                whileHover={{ y: -4 }}
                className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 text-xl">
                  {c.icon}
                </div>
                <h3 className="font-bold text-gray-900 mt-4">{c.title}</h3>
                <p className="text-sm text-gray-600 mt-2 leading-6">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Highlights */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.55, delay: 0.3 }}
          className="max-w-6xl mx-auto mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <div className="bg-white border rounded-2xl p-7 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <FaCheckCircle className="text-blue-600" />
              Professional Highlights
            </h2>

            <ul className="mt-4 space-y-3">
              {highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 w-2 h-2 rounded-full bg-blue-600"></span>
                  <p className="text-gray-700 leading-7">{h}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Timeline style */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-7 shadow-sm">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FaUsers />
              How I Work
            </h2>

            <div className="mt-5 space-y-4">
              <div className="bg-white/10 border border-white/20 rounded-2xl p-4">
                <p className="font-semibold">1) Understand Requirements</p>
                <p className="text-sm text-white/90 mt-1">
                  I clarify goals, roles, permissions, and edge cases before
                  coding.
                </p>
              </div>

              <div className="bg-white/10 border border-white/20 rounded-2xl p-4">
                <p className="font-semibold">2) Build Secure Backend</p>
                <p className="text-sm text-white/90 mt-1">
                  I implement authentication + authorization first to keep data
                  safe.
                </p>
              </div>

              <div className="bg-white/10 border border-white/20 rounded-2xl p-4">
                <p className="font-semibold">3) Create Clean UI</p>
                <p className="text-sm text-white/90 mt-1">
                  I focus on responsive layouts, loading states, and good UX.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer note */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.55, delay: 0.4 }}
          className="max-w-4xl mx-auto mt-12 text-center"
        >
          <p className="text-gray-600 leading-7">
            I’m always learning and improving my skills — currently focusing on
            building production-level MERN projects and preparing for interviews.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default About;
