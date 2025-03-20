const User = require('../../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
require('dotenv').config();


const SECRET_KEY = 'your_secret_key';


const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, phone, address } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        let phoneExists = await User.findOne({ phone });
        if (phoneExists) {
            return res.status(400).json({ message: 'Phone number already registered' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            isEmailVerified: false, // Default value (email verification pending)
        });

        await user.save();

        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });

        res.status(201).json({ message: 'User registered successfully. Please verify your email.', token });
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
        res.json({ message: 'User logged in successfully', token, user: { id: user.id, name: user.name, email: user.email,isEmailVerified:user.isEmailVerified } });
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

const updateProfile = async (req, res) => {
    const { id } = req.user;
    const { name, email, phone, address, currentPassword, newPassword } = req.body;

    try {
        let user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify the current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        // Update fields if provided
        if (name) user.name = name;
        if (email) user.email = email;
        if (phone) user.phone = phone;
        if (address) user.address = address;

        // If new password is provided, hash it and update
        if (newPassword) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
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



const checkVerificationStatus = async (req, res) => {
    try {
        const user = req.user; // Extracted from token
        console.log("User extracted from token:", user); // Debugging line  

        res.status(200).json({
            email: user.email,
            isEmailVerified: user.isEmailVerified,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


const SendEmailVerification = async (req, res) => {
    try {
        const user = req.user; // Extracted from token
        console.log("User extracted from token:", user); // Debugging line


        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Generate a 4-digit OTP
        const otp = Math.floor(1000 + Math.random() * 9000);

        // Set expiry time (5 minutes from now)
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

        // Update user document with OTP and expiry time
        await User.findByIdAndUpdate(user._id, {
            emailVerificationCode: otp,
            emailVerificationExpires: otpExpiry
        });

        // Set up nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { 
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS 
            }
        });

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER, 
            to: user.email,
            subject: 'Email Verification Code',
            text: `Your email verification code is: ${otp}. This code is valid for 5 minutes.`
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Verification email sent successfully' });
    } catch (error) {
        console.error("Error sending verification email:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};



const VerifyEmailOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if OTP is correct and not expired
        if (user.emailVerificationCode !== otp || user.emailVerificationExpires < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // Update user verification status without requiring other fields
        await User.findByIdAndUpdate(user._id, {
            isEmailVerified: true,
            emailVerificationCode: null,
            emailVerificationExpires: null
        });

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};



module.exports = { registerUser, loginUser, forgotPassword, resetPassword, updateProfile, getUserProfile, checkVerificationStatus,SendEmailVerification,VerifyEmailOTP };


