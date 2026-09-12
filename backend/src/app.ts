import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { routes } from './routes';
import { errorHandler, notFound } from './middleware/error.middleware';

dotenv.config();

const app = express();

// ── CORS ──────────────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));

// ── Body Parsers ──────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── API Routes ────────────────────────────────────────────────────────────────
app.use('/api/v1', routes);

// ── 404 & Error Handlers ──────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

export { app };
