const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const { registerUser, loginUser } = require('../controllers/authController.js');

router.post('/register', registerUser);
router.post('/login', loginUser);

router.post('/get-id', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({ userId: user._id });
  } catch (err) {
    console.error('Error getting user ID:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
