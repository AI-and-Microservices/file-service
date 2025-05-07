const express = require('express');
const controller = require('../controllers/fileController');
const router = express.Router();

router.get('/files/', controller.getFiles);

module.exports = router;