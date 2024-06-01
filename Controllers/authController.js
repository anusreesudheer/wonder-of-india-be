import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { email, password, userName, role, secretKey } = req.body;
console.log(req.body)
    // Ensure role is either 'user' or 'admin'
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role specified' });

    }

    // If role is admin, check the secret key
    if (role === 'admin' && secretKey !== 'anvika') {
      return res.status(400).json({ message: 'Invalid secret key for admin registration' });
    }

    // Check if username is already taken
    const existingUserName = await User.findOne({ userName });
    if (existingUserName) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    // Check if email is already registered
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ email, password: hashedPassword, userName, role });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// User login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      return res.status(401).json({ success: false, message: 'Incorrect email or password' });
    }

    const { password: _, ...rest } = user._doc;

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    res.cookie("accessToken", token, { httpOnly: true, expires: token.expiresIn })
       .status(200).json({ success: true, message: "Successfully logged in", token, data: { ...rest }, role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to login' });
  }
};

// Get single user
export const getSingleUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    res.status(200).json({ success: true, message: "Successfully retrieved user", data: user });
  } catch (err) {
    console.error(err);
    res.status(404).json({ success: false, message: "User not found" });
  }
};

// Get all users
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, message: "Successfully retrieved users", data: users });
  } catch (err) {
    console.error(err);
    res.status(404).json({ success: false, message: "Users not found" });
  }
};
