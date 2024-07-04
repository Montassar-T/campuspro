const express = require('express');
const router = express.Router();
const workersController = require('../controllers/workersController');


router.use(require('../middleware/verifyJWT'))

router.route('/').get(workersController.getAll);
router.route('/delete/:id').delete(workersController.deleteWorker);


module.exports = router;