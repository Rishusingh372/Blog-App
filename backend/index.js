import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGO_URI;

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:4001",
  "https://blog-app-five-sigma-33.vercel.app",
  "https://blog-app-say8.onrender.com",
];

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

try {
  await mongoose.connect(MONGO_URL);
  console.log("Connected to MongoDB");
} catch (error) {
  console.error("MongoDB connection error:", error);
  process.exit(1);
}

app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);

app.get("/", (req, res) => {
  res.json({ message: "Blog API is running" });
});

app.get("/api/test", (req, res) => {
  res.json({
    message: "CORS is working correctly",
    origin: req.headers.origin || null,
  });
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

app.use((err, req, res, next) => {
  if (err.message?.startsWith("CORS blocked for origin:")) {
    return res.status(403).json({ error: err.message });
  }

  console.error("Error:", err.message);
  return res.status(500).json({ error: err.message });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
