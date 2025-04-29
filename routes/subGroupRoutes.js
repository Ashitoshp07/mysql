const express = require('express');
const subGroupControllers = require('../controllers/subGroupController');
const upload = require("../middleware/userImg");

const router = express.Router();

router.post('/createsubGroup', upload.single('subgroup_profile_url'), subGroupControllers.createsubGroup);

router.get('/GetSingalsubGroup/:id', subGroupControllers.getsubGroupById);

router.delete('/deletesubGroupByid/:id', subGroupControllers.deletesubGroupbyId);

router.put('/updatesubGroupByid/:id', upload.single('subgroup_profile_url'), subGroupControllers.updatesubGroup);


module.exports = router;