const express = require('express');
const router = express.Router();
const { handleOmnidimWebhook } = require('../controllers/userController');

router.post('/omnidim-data', handleOmnidimWebhook);

module.exports = router;
