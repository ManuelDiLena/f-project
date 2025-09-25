import express from 'express';
import http from 'node:http';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Server as IOServer } from 'socket.io';
import authRoutes from './routes/auth';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new IOServer(server, {
  cors: { origin: process.env.CLIENT_URL || '*' }
});

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(rateLimit({ windowMs: 1 * 60 * 1000, max: 100 }));

app.get('/api/health', (_, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);

io.on('connection', (socket) => {
  console.log('Socket connected', socket.id);
  socket.on('disconnect', () => console.log('Disconnect', socket.id));
});

const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.MONGO_URI || '')
  .then(() => {
    server.listen(PORT, () => console.log(`🚀 API listening on ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error', err);
    process.exit(1);
  });

