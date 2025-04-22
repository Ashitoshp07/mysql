const express = require('express');
const subGroupControllers = require('../controllers/subGroupController');
const upload = require("../middleware/userImg");

const router = express.Router();

router.post('/createsubGroup', upload.single('subgroup_profile_url'), subGroupControllers.createsubGroup);

router.get('/GetSingalsubGroup/:id', subGroupControllers.getsubGroupById);

router.delete('/deletesubGroupByid/:id', subGroupControllers.deletesubGroupbyId);

router.put('/updatesubGroupByid/:id', upload.single('subgroup_profile_url'), subGroupControllers.updatesubGroup);

router.get('/getSubgroups', subGroupControllers.getsubGroupByGroup);

router.get('/getSubGroupMember/:group_name/:subgroup_name', subGroupControllers.getSubGroupMember);

module.exports = router;