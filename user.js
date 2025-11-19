const mongoose = require('mongoose');

// Define User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Store hashed password
}, { timestamps: true });

// Create User model
const User = mongoose.model('User', userSchema);

module.exports = User;

// Controller functions for user profile

// Get logged-in user's profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assumes auth middleware sets req.user
    const user = await User.findById(userId).select('-password'); // Exclude password from response
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update logged-in user's profile 
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();
    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
