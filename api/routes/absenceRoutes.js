const express = require('express');
const router = express.Router();
const absenceController = require("../controllers/absenceController")


router.route('/').get(absenceController.getAll)
router.route('/delete/:id').delete(absenceController.deleteAbsence)
router.route('/add').post(absenceController.addAbsence)
router.route('/edit').post(absenceController.editAbsence)





module.exports = router;