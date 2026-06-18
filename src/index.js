const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.CORS_ORIGIN,
].filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true)
    return cb(null, false)
  },
  credentials: true,
}));
app.options('*', cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/cards', require('./routes/card.routes'));

app.get('/', (req, res) => res.json({ message: '🚀 Server ishlamoqda!' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server http://localhost:${PORT} da ishlamoqda`)
);