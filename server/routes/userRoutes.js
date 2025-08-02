const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.post('/register', authController.registerUser);
router.post('/login', userController.loginUser);
router.post('/omnidim-data', userController.handleOmnidimWebhook);
router.get('/analysis/:email', userController.getUserAnalysis);
router.post('/update-vector', userController.updateVector);
router.post('/submit-match', userController.submitMatch);

module.exports = router;
