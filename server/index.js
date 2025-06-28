// Importing necessary modules and packages
const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payments");
const contactUsRoute = require("./routes/Contact");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

// Setting up port number
const PORT = process.env.PORT || 4000;

// Loading environment variables from .env file
dotenv.config();

// Connecting to database
database.connect();
 
// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: process.env.NODE_ENV === "production" 
			? ["https://study-notion-frontend-gray-sigma.vercel.app", "https://studynotion-frontend.vercel.app"]
			: ["http://localhost:3000"],
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
		allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
	})
);
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);

// Connecting to cloudinary
cloudinaryConnect();

// Setting up routes
app.use("/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

// Health check endpoint for Render
app.get("/", (req, res) => {
	return res.status(200).json({
		success: true,
		message: "Your server is up and running ...",
		timestamp: new Date().toISOString(),
		environment: process.env.NODE_ENV || "development"
	});
});

// Additional health check endpoint
app.get("/health", (req, res) => {
	return res.status(200).json({
		success: true,
		message: "Server is healthy",
		timestamp: new Date().toISOString(),
		uptime: process.uptime()
	});
});

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		success: false,
		message: "Something went wrong!",
		error: process.env.NODE_ENV === "development" ? err.message : "Internal server error"
	});
});

// 404 handler
app.use("*", (req, res) => {
	res.status(404).json({
		success: false,
		message: "Route not found"
	});
});

// Listening to the server
app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
	console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
	console.log('SIGTERM received, shutting down gracefully');
	process.exit(0);
});

// End of code.
