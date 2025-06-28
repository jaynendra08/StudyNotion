const mongoose = require("mongoose");
require("dotenv").config();

const { MONGODB_URL } = process.env;

exports.connect = () => {
	if (!MONGODB_URL) {
		console.log("MONGODB_URL is not defined in environment variables");
		process.exit(1);
	}

	mongoose
		.connect(MONGODB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			maxPoolSize: 10,
			serverSelectionTimeoutMS: 5000,
			socketTimeoutMS: 45000,
		})
		.then(() => {
			console.log(`DB Connection Success`);
		})
		.catch((err) => {
			console.log(`DB Connection Failed`);
			console.log(err);
			process.exit(1);
		});

	// Handle connection events
	mongoose.connection.on('error', (err) => {
		console.log('MongoDB connection error:', err);
	});

	mongoose.connection.on('disconnected', () => {
		console.log('MongoDB disconnected');
	});

	// Graceful shutdown
	process.on('SIGINT', async () => {
		await mongoose.connection.close();
		console.log('MongoDB connection closed through app termination');
		process.exit(0);
	});
};
