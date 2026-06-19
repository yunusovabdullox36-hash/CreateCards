const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowed = [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.CORS_ORIGIN,
  ].filter(Boolean);

  if (origin && allowed.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (!origin) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/cards', require('./routes/card.routes'));

app.get('/', (req, res) => res.json({ message: '🚀 Server ishlamoqda!' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server http://localhost:${PORT} da ishlamoqda`)
);
