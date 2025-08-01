const User = require('../models/User.js');
const { spawn } = require('child_process');

// Dummy registration (Onboarding)
exports.registerUser = async (req, res) => {
  try {
    const { name, email, phone, age, location, budget } = req.body;

    let ageGroup = '';
    if (age >= 16 && age <= 18) ageGroup = '16-18';
    else if (age > 18 && age <= 25) ageGroup = '18-25';
    else if (age > 25) ageGroup = '25+';

    const user = new User({ name, email, phone, age, ageGroup, location, budget, traits: {} });
    await user.save();

    res.status(201).json({ message: 'User registered', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Dummy login
exports.loginUser = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    console.log(user)

    // Call FastAPI agent creation endpoint instead of spawning Python script
    const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
    try {
      const fastApiUrl = 'http://localhost:8000/create-agent';
      const response = await fetch(fastApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to_number: user.phone })
      });
      const fastApiResult = await response.json();
      console.log('FastAPI agent response:', fastApiResult);
    } catch (err) {
      console.error('Error calling FastAPI agent:', err);
    }

    return res.status(200).json({
      message: 'Login successful, Omnidim agent triggered',
      user
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

