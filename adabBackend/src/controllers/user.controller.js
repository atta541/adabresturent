// const User = require('../models/user.model');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { validationResult } = require('express-validator');

// // User Registration Function (Already Implemented)
// const registerUser = async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { name, email, password } = req.body;

//     try {
//         let user = await User.findOne({ email });

//         if (user) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         user = new User({ name, email, password: hashedPassword });
//         await user.save();

//         const token = jwt.sign({ id: user.id }, 'your_secret_key', { expiresIn: '1h' });

//         res.status(201).json({ message: 'User registered successfully', token });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// };

// // User Login Function
// const loginUser = async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(400).json({ message: 'Invalid email or password' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid email or password' });
//         }

//         const token = jwt.sign({ id: user.id }, 'your_secret_key', { expiresIn: '1h' });

//         res.json({ message: 'User logged in successfully', token, user: { id: user.id, name: user.name, email: user.email } });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// };

// module.exports = { registerUser, loginUser };




const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
require('dotenv').config();


const SECRET_KEY = 'your_secret_key';

// User Registration
const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user = new User({ name, email, password: hashedPassword });
        await user.save();
        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// User Login
const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
        console.log(token);
        res.json({ message: 'User logged in successfully', token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};




const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password for security
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(user);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};





// Forgot Password
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const resetToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '15m' });
        await sendResetEmail(email, resetToken);
        res.json({ message: 'Password reset email sent' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Reset Password
const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(400).json({ message: 'Invalid token' });
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();
        res.json({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Invalid or expired token', error });
    }
};

// Update Profile
const updateProfile = async (req, res) => {
    const { id } = req.user;
    const { name, email, password } = req.body;
    try {
        let user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (name) user.name = name;
        if (email) user.email = email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }
        await user.save();
        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Send Reset Email (Helper Function)
const sendResetEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });
    const mailOptions = {
        from: 'attareh542@gmail.com',
        to: email,
        subject: 'Password Reset Request',
        text: `Click on this link to reset your password: http://yourdomain.com/reset-password?token=${token}`
    };
    await transporter.sendMail(mailOptions);
};

module.exports = { registerUser, loginUser, forgotPassword, resetPassword, updateProfile,getUserProfile };