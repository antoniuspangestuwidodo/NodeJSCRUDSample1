const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
// require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const itemRoutes = require('./routes/items');
app.use('/api/items', itemRoutes);

// Auth
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection failed:', err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
