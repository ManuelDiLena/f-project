import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

dotenv.config();
import connectDB from './config/db.js';

const app = express();

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));

// Rate limiter
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

// Test route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// DB connection + Start Server
connectDB().then(() => {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});