// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true // Include credentials like cookies in requests
}));


// MongoDB connection
mongoose.connect('mongodb://localhost:27017/Celebrate-Mate', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});


// Setting Routes

// Import and use the user routes
app.use('/api/users', require('./routes/users'));
// Import and use the friend routes
app.use('/api/friends', require('./routes/friends'));



// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
