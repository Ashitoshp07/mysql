const db = require('../config/db');

const User = {

    getAllUsers: async () => {
        const [rows] = await db.query('SELECT * FROM user');
        return rows;
    },

    createUser: async (user_name, user_contact, user_profile_url, user_dob) => {
        const query = 'INSERT INTO user (user_name, user_contact, user_profile_url, user_dob) VALUES (?, ?, ?, ?)';
        const [result] = await db.execute(query, [user_name, user_contact, user_profile_url, user_dob]);
        return result.insertId; // Return the inserted user's ID
    },

    getUserById: async (userId) => {
        const query = 'SELECT * FROM user WHERE u_id = ?';
        const [rows] = await db.execute(query, [userId]);
        return rows[0]; // Return the first row (user)
    },

    updateUser: async (userId, user_name, user_contact, user_profile_url, user_dob) => {
        const query = 'UPDATE user SET user_name = ?, user_contact = ?, user_profile_url = ?, user_dob = ? WHERE u_id = ?';
        const [result] = await db.execute(query, [user_name, user_contact, user_profile_url, user_dob, userId]);
        return result.affectedRows; // Return the number of affected rows
    },

    deleteUser: async (userId) => {
        const query = 'DELETE FROM user WHERE u_id = ?';
        const [result] = await db.execute(query, [userId]);
        return result.affectedRows; // Return the number of affected rows
    }
}




// module.exports = User;



// };

module.exports = User;



