const User = require('../models/User');
const bcrypt = require('bcryptjs');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields (name, email, password) are required.' 
      });
    }

    // Trim whitespace
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name cannot be empty or whitespace.' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 6 characters long.' 
      });
    }

    // 2. Email format validation
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide a valid email address.' 
      });
    }

    // 3. Check for existing user
    const userExists = await User.findOne({ email: trimmedEmail });
    if (userExists) {
      return res.status(400).json({ 
        success: false, 
        message: 'An account with this email address already exists.' 
      });
    }

    // 4. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 5. Create user in database
    const user = await User.create({
      name: trimmedName,
      email: trimmedEmail,
      password: hashedPassword
    });

    if (user) {
      return res.status(201).json({
        success: true,
        message: 'Registration successful! Your account has been created.',
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      });
    } else {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid user data received.' 
      });
    }
  } catch (error) {
    console.error(`Registration Controller Error: ${error.message}`);
    return res.status(500).json({ 
      success: false, 
      message: 'A server error occurred. Please try again later.' 
    });
  }
};

module.exports = {
  registerUser,
};
