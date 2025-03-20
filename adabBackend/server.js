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
const itemsRoutes = require('./src/routes/items/items.route');
const subitems = require('./src/routes/items/subitems.route');

// Use Routes
app.use('/atta', (req, res) => {
    res.send('atta');
});
app.use('/api/users', userRoutes);
app.use('/api/login', userRoutes);
app.use('/api/items', itemsRoutes);
app.use('/api/subitems', subitems);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
