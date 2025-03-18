// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./src/db/db'); // Import DB connection

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Connect to MongoDB
// connectDB();

// // Default Route
// app.get('/', (req, res) => {
//     res.send('Welcome to Adab Restaurant Backend!');
// });

// // Start Server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });


const express = require('express');
const cors = require('cors');
const connectDB = require('./src/db/db');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Import Routes
const userRoutes = require('./src/routes/users/user.route');

// Use Routes
app.use('/api/users', userRoutes);
app.use('api/login', userRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
