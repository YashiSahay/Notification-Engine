require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const notificationRoutes = require('./routes/notificationRoutes');
const authRoutes = require('./routes/authRoutes');
require('./workers/emailWorker'); // ✅ start the worker

const app = express();

// Connect Database
connectDB();

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: 'Too many requests, please try again later.' }
});

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://notification-engine-alpha.vercel.app'],
  credentials: true
}));
app.use(express.json());
app.use('/api/', limiter);

// API Routes
app.use('/api/notifications', notificationRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Engine Fired Up on Port ${PORT}`);
  console.log(`✅ Ready to handle Login and Registration`);
});
const { OAuth2Client } = require('google-auth-library');
const googleClient = new OAuth2Client('1091954939952-vl37plq92jukaa02l21rotvhv7eofpfr.apps.googleusercontent.com');

app.post('/api/auth/google', async (req, res) => {
    const { credential } = req.body;
    try {
        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: '1091954939952-vl37plq92jukaa02l21rotvhv7eofpfr.apps.googleusercontent.com'
        });
        const payload = ticket.getPayload();
        const email = payload.email;

        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({ 
                email, 
                password: Math.random().toString(36)
            });
        }

        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '7d' }
        );
        res.json({ token, email });
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Invalid Google token' });
    }
});