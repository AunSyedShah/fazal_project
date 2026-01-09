import express from 'express';
import mongoose from 'mongoose';
import eventRoutes from './routes/eventRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cors from 'cors';


const app = express();
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], allowedHeaders: ['Content-Type', 'Authorization'] }));
app.use(express.json());

app.use('/api/events', eventRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
	console.error('✗ Error: MONGODB_URL is not set in .env file');
	process.exit(1);
}

async function startServer() {
	try {
		await mongoose.connect(MONGODB_URL);
		console.log('✓ Connected to MongoDB');
		app.listen(PORT, () => {
			console.log(`✓ Server running on http://localhost:${PORT}`);
		});
	} catch (err) {
		console.error('✗ MongoDB connection error:', err.message);
		process.exit(1);
	}
}

startServer();