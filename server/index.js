// Importing necessary modules and packages
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");

// Route imports
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payments");
const contactUsRoute = require("./routes/Contact");

// Config imports
const database = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");

// Load env variables
dotenv.config();

// Connect to the database
database.connect();

// Connect to Cloudinary
cloudinaryConnect();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ CORS Setup — for Vercel Frontend and localhost
const allowedOrigins = [
  "https://study-notion-frontend-gray-sigma.vercel.app",
  "https://study-notion-frontend-6x66zj2l9-jaynendra-singhs-projects.vercel.app",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Accept preflight OPTIONS requests
app.options("*", cors());

// File upload middleware
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

// Test route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running 🚀",
  });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});
