const express = require('express');
const router = express.Router();
const absenceController = require("../controllers/absenceController")


router.route('/').get(absenceController.getAll)
router.route('/delete/:id').delete(absenceController.deleteAbsence)





module.exports = router;