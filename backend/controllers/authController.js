const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

console.log("SERVICE:", process.env.SERVICE);            //optional
console.log("EMAIL_USER:", process.env.EMAIL_USER);      //optional
console.log("MAIL_PASS:", process.env.MAIL_PASS);        //optional

const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

// Register User
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, otp, password: hashedPassword });
        await user.save();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Verify your email',
            text: `Hi ${name}, your OTP is ${otp}.`,
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ message: 'User registered successfully. Please verify your email.' });
    } catch (error) {
        console.error("Error in user registration:", error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Verify OTP

exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    console.log(`OTP: ${user.otp}`);

    if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (user.otp === otp) {
            user.isVerified = true;
            user.otp = null;

            const token = jwt.sign(
                { email: user.email, isVerified: true, userId: user._id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            user.token = token;
            await user.save();

            return res.status(200).json({ message: "OTP verified successfully", token });
        } else {
            return res.status(400).json({ message: "Invalid OTP" });
        }
    } catch (error) {
        console.error("Error in OTP verification:", error.message);
        res.status(500).json({ message: "Failed to verify OTP", error: error.message });
    }
};

// exports.verifyOtp = async (req, res) => {
//     const { email, otp } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: "User not found" });
//         }

//         if (user.otp === otp) {
//             user.isVerified = true;
//             user.otp = null;

//             const token = jwt.sign({
//                 email: user.email,
//                 isVerified: true,
//                 userId: user._id,
//             }, process.env.JWT_SECRET, { expiresIn: '1h' });

//             user.token = token;
//             await user.save();

//             return res.status(200).json({ message: "OTP verified successfully", token });
//         } else {
//             return res.status(400).json({ message: "Invalid OTP" });
//         }
//     } catch (error) {
//         console.error("Error in OTP verification:", error.message);
//         res.status(500).json({ message: "Failed to verify user", error: error.message });
//     }
// };

// Login User
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid Email or Password" });
        }

        const token = jwt.sign(
            { email: existingUser.email, userId: existingUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({ message: "Sign-in successful", token });
    } catch (error) {
        console.error("Sign-in error:", error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};



// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const nodemailer = require('nodemailer');
// const dotenv =require("detenv") ;

// dotenv.config();

// const transporter = nodemailer.createTransport({
//     service: process.env.SERVICE,
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.MAIL_PASS
//     }
// })

// // Register User
// exports.registerUser = async (req, res) => {
//     const { name, email, password } = req.body;
//     const otp = Math.floor(1000 + Math.random() * 9000).toString(); 
//     try {
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'User already exists' });
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = new User({ name, email, otp, password: hashedPassword });
//         await user.save();
//         res.status(201).json({ message: 'User registered successfully' });

//         const mailOptions= {
//             from: process.env.EMAIL_USER,
//             to: email,
//             subject: 'Verify your email',
//             text: `Hii! ${user} Your OTP is ${otp}. `,
//         };

//         await transporter.sendMail(mailOptions);
//         res.status(201).json({ message: 'User regestered successfully' });

//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// // otp handler

// exports.verifyOtp = async (req,res) => {
//     const { email, otp, user } = req.body;

//     try{
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(400).json({message: "User not found"});
//         }
//         console.log("User found:", User);

//         if (user.otp === otp) {
//             user.isVerified = true,
//             user.otp = null;
//             const token = jwt.sign({
//                 email: user.email,
//                 isVerified: true,
//                 userId: user._id
//             }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Expires in 1 hour
            

//             user.token = token ;
//             await user.save();                
//             return res.status(200).json({message: "OTP verified successfully"});
//         }
//         else {
//             return res.status(400).json({message: "Invalid OTP"});
//         }
//     } 
//     catch (error) {
//         res.status(500).json({ message: 'Failes to Verify user',error: err.message });
// }
// };

// // Login User
// exports.loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const existingUser = await User.findOne({ email });
//         if (!existingUser) {
//             return res.status(400).json({ message: "User not found" });
//         }
//         if (existingUser.password !== password) {
//             return res.status(400).json({ message: "Invalid Email or Password" });
//         }
//         const token = jwt.sign(
//             { email: existingUser.email, userId: existingUser._id },
//             process.env.JWT_SECRET,
//             { expiresIn: "1h" }
//         );
//         return res.status(200).json({ message: "Sign-in successful", token });
//     } catch (error) {
//         console.error("Sign-in error:", error.message);
//         res.status(500).json({ message: "Internal server error", error: error.message });
//     }
// };
