const express = require('express');
const userController = require('../controllers/userController');
const upload = require("../middleware/userImg");

const router = express.Router();

router.get('/users', userController.getAllUsers);
router.post('/users', upload.single('profile_url'), userController.createUser);
router.get('/GetSingalUsers/:id', userController.getUserById); // Assuming you have a getUserById method in your controller
router.delete('/users/:id', userController.deleteUser);


module.exports = router;