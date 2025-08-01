const express = require('express');
const router = express.Router();
const { handleOmnidimWebhook,checkCallStatusById, getPostCallAnalysis  } = require('../controllers/userController');

router.post('/omnidim-data', handleOmnidimWebhook);
router.get('/:userId/call-status', checkCallStatusById);
router.get('/:id/post-call-analysis', getPostCallAnalysis )

module.exports = router;
