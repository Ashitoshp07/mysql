const User = require('../models/userModel');
const jwt = require("jsonwebtoken");


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createUser = async (req, res) => {
    try {

        const { user_name, user_contact, profile_url, dob } = req.body;
        // console.log(req.body)

        const user = await User.createUser(user_name, user_contact, profile_url, dob);

        // Generate JWT Token
        const token = jwt.sign({ id: User.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // res.json({ message: "Genrate token", token });


        return res.status(201).json({ message: 'User created successfully', user, token, });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }



};






