const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Verify the request is coming from an existing admin
    const requestingUser = await User.findById(req.user.id);
    if (!requestingUser || requestingUser.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to create admin accounts' });
    }

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password,
      role: 'admin'
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update the register function to include role in the response
exports.register = async (req, res) => {
  try {
    console.log('Registration request received:', req.body);
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      console.log('Missing required fields');
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = new User({
      name,
      email,
      password
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    console.log('User created successfully:', user._id);

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token with role
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
    console.log('User logged in successfully:', user._id);
    console.log('Token generated:', token);
    console.log('User role:', user.role);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.handleOAuth = async (req, res) => {
  try {
    const { provider, profile } = req.body;

    if (provider === 'google') {
      // Look for existing user by Google ID or email
      let user = await User.findOne({
        $or: [
          { googleId: profile.googleId },
          { email: profile.email }
        ]
      });

      if (!user) {
        // Create new user if doesn't exist
        user = new User({
          name: profile.name,
          email: profile.email,
          googleId: profile.googleId,
          image: profile.image,
          emailVerified: true
        });
        await user.save();
      } else if (!user.googleId) {
        // Link Google account to existing email account
        user.googleId = profile.googleId;
        user.image = profile.image || user.image;
        await user.save();
      }

      return res.json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role || 'user'
        }
      });
    }

    res.status(400).json({ message: 'Unsupported OAuth provider' });
  } catch (error) {
    console.error('OAuth handling error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
