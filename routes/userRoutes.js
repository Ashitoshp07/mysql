const express = require('express');
const userController = require('../controllers/userController');
const upload = require("../middleware/userImg");

const router = express.Router();

// router.use('/user_profile_url', express.static('./upload/user_profile/'));

router.get('/getAllUser', userController.getAllUsers);//no use
router.post('/createUsers', upload.single('user_profile_url'), userController.createUser);
router.get('/GetSingalUsers/:id', userController.getUserById); // Assuming you have a getUserById method in your controller
router.put('/updateUsersByid/:id', upload.single('user_profile_url'), userController.updateUser);
router.delete('/deleteUsersByid/:id', userController.deleteUser);


module.exports = router;