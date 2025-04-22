const express = require('express');
const groupController = require('../controllers/groupController');
const upload = require("../middleware/userImg");

const router = express.Router();


router.post('/creategroup', upload.single('group_profile_url'), groupController.creategroup);

router.get('/GetGroups/:user_name', groupController.getGroupByUser);

router.put('/updateGroupByid/:id', upload.single('group_profile_url'), groupController.updateGroup);

router.delete('/deleteGroupByid/:id', groupController.deleteGroup);

router.get('/getGroupMember/:group_name', groupController.getGroupMember);

router.post('/allocateMembers', groupController.allocateMembers);

router.post('/deallocateMembers', groupController.deallocateMembers);

module.exports = router;
