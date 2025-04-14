const express = require('express');
const groupController = require('../controllers/groupController');
const upload = require("../middleware/userImg");

const router = express.Router();


router.post('/creategroup', upload.single('group_profile_url'), groupController.creategroup);

router.get('/GetSingalGroup/:id', groupController.getGroupById);

router.put('/updateGroupByid/:id', upload.single('group_profile_url'), groupController.updateGroup);

router.delete('/deleteGroupByid/:id', groupController.deleteGroup);



module.exports = router;
