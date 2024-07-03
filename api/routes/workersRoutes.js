const express = require('express');
const router = express.Router();
const workersController = require('../controllers/workersController')




router.route('/').get(workersController.getAll);


module.exports = router;