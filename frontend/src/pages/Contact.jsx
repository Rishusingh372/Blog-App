import React, { useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function Contact() {
  const [sending, setSending] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      access_key: "c660c9ce-c6f9-41f7-aa0f-8a24ea887b94",
      name: data.username,
      email: data.email,
      message: data.message,
    };

    try {
      setSending(true);
      await axios.post("https://api.web3forms.com/submit", userInfo);
      toast.success("Message sent successfully ✅");
      reset();
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Contact Us
          </h1>
          <p className="text-gray-600 mt-2">
            Have a question or want to work together? Send a message — we’ll get
            back to you soon.
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.55, delay: 0.1 }}
            className="bg-white border rounded-2xl shadow-sm p-6 md:p-8"
          >
            <h2 className="text-xl font-bold text-gray-900">Send a Message</h2>
            <p className="text-sm text-gray-500 mt-1">
              Fill the form below and hit send.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              {/* Name */}
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className={`mt-2 w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-200 transition ${
                    errors.username ? "border-red-400" : "border-gray-200"
                  }`}
                  {...register("username", {
                    required: "Name is required",
                    minLength: { value: 2, message: "Minimum 2 characters" },
                  })}
                />
                {errors.username && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className={`mt-2 w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-200 transition ${
                    errors.email ? "border-red-400" : "border-gray-200"
                  }`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Enter a valid email",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Write your message..."
                  className={`mt-2 w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-200 transition resize-none ${
                    errors.message ? "border-red-400" : "border-gray-200"
                  }`}
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message should be at least 10 characters",
                    },
                  })}
                />
                {errors.message && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.01 }}
                type="submit"
                disabled={sending}
                className={`w-full py-3 rounded-xl font-semibold text-white transition ${
                  sending
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {sending ? "Sending..." : "Send Message"}
              </motion.button>

              <p className="text-xs text-gray-500 text-center">
                We typically respond within 24 hours.
              </p>
            </form>
          </motion.div>

          {/* Right: Contact Cards */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.55, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="bg-white border rounded-2xl shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900">
                Contact Information
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                You can also reach out directly:
              </p>

              <div className="mt-6 grid gap-3">
                <motion.div
                  whileHover={{ y: -2 }}
                  className="flex items-center gap-3 p-4 rounded-2xl border bg-gray-50"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border flex items-center justify-center">
                    <FaPhone className="text-gray-900" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Phone</p>
                    <p className="text-sm text-gray-600">+91 93418974</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -2 }}
                  className="flex items-center gap-3 p-4 rounded-2xl border bg-gray-50"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border flex items-center justify-center">
                    <FaEnvelope className="text-gray-900" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Email</p>
                    <p className="text-sm text-gray-600">rishu272018@gmail.com</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -2 }}
                  className="flex items-center gap-3 p-4 rounded-2xl border bg-gray-50"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border flex items-center justify-center">
                    <FaMapMarkerAlt className="text-gray-900" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Location
                    </p>
                    <p className="text-sm text-gray-600">Bhopal, MP, India</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Extra box */}
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6 md:p-8 shadow-sm"
            >
              <h3 className="text-lg font-bold">Let’s build something great</h3>
              <p className="text-white/90 mt-2 text-sm">
                If you have a project idea, collaboration, or feedback — send a
                message. We’d love to hear from you.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
