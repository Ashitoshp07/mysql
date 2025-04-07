const db = require('../config/db');

const User = {

    getAllUsers: async () => {
        const [rows] = await db.query('SELECT * FROM user');
        return rows;
    },

    createUser: async (user_name, user_contact, profile_url, dob) => {
        const [result] = await db.query('INSERT INTO user (user_name,user_contact, profile_url,dob) VALUES (?, ?,?,?)', [user_name, user_contact, profile_url, dob]);
        return result;
    }





};

module.exports = User;

//HOSTNAME=127.0.0.1
// 3306
// ROOT
// Sujit@123