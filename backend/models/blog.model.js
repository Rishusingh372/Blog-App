import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    blogImage: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },

    category: {
      type: String,
      required: true,
    },

    about: {
      type: String,
      required: true,
      minlength: [200, "Should contain atleast 200 characters!"],
    },

    adminName: {
      type: String,
    },

    adminPhoto: {
      type: String,
    },

    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },

    // ✅ NEW: moderation fields
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    approvedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    approvedAt: Date,
    rejectedReason: String,
  },
  { timestamps: true }
);

export const Blog = mongoose.model("Blog", blogSchema);
