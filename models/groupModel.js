const db = require('../config/db');

const Groups = {
    creategroup: async (group_name, group_profile_url, group_created_user) => {
        const query = 'INSERT INTO `groups` (group_name, group_profile_url,group_created_user) VALUES (?, ?,?)';
        const [result] = await db.execute(query, [group_name, group_profile_url, group_created_user]);
        return result.insertId;
    },


    getGroupByUserName: async (userName) => {
        //    const query = 'SELECT * FROM `groups` WHERE group_created_user = ?';

        const query = `SELECT g.*
                        FROM group_member gm
                        JOIN \`groups\` g ON gm.group_name = g.group_name
                        WHERE gm.user_name = ?;
                     `;
        const [rows] = await db.execute(query, [userName]);
        return rows;
    },

    getGroupById: async (groupId) => {
        const query = 'SELECT * FROM `groups` WHERE group_id = ?';
        const [rows] = await db.execute(query, [groupId]);
        return rows[0];
    },

    getGroupMember: async (group_name) => {

        const query = `SELECT 
                       u.user_name, 
                       u.user_profile_url, 
                       gm.user_contacts
                       FROM 
                      group_member gm
                      JOIN 
                      user u ON gm.user_contacts = u.user_contact
                      WHERE 
                     gm.group_name = ? `;

        const [rows] = await db.execute(query, [group_name]);
        return rows;
    },

    allocateMember: async (group_name, user_contacts) => {
        const query = `INSERT INTO group_member (group_name, user_contacts) VALUES (?, ?)`;

        for (const contact of user_contacts) {
            await db.execute(query, [group_name, contact]);
        }
        return { message: "Members allocated successfully." };
    },

    getAllocatedUserInfo: async (group_name, user_contacts) => {
        const placeholders = user_contacts.map(() => '?').join(',');
        const query = `
            SELECT u.user_name, u.user_profile_url, u.user_contact
            FROM group_member gm
            JOIN user u ON gm.user_contacts = u.user_contact
            WHERE gm.group_name = ? AND gm.user_contacts IN (${placeholders})
        `;
        const [rows] = await db.execute(query, [group_name, ...user_contacts]);
        return rows;
    },

    deallocateMember: async (group_name, user_contacts) => {
        const query = `DELETE FROM group_member WHERE group_name = ? AND user_contacts = ?`;

        for (const user_contacts of user_contacts) {
            await db.execute(query, [group_name, user_contacts]);
        }
        return { message: "Members deallocated successfully." };
    },


    updateGroup: async (groupId, group_name, group_profile_url) => {
        const query = 'UPDATE `groups` SET group_name = ?, group_profile_url = ? WHERE group_id = ?';
        const [result] = await db.execute(query, [group_name, group_profile_url, groupId]);
        return result.affectedRows;
    },

    deleteGroup: async (groupId) => {
        const query = 'DELETE FROM `groups` WHERE group_id = ?';
        const [result] = await db.execute(query, [groupId]);
        return result.affectedRows;
    }

};

module.exports = Groups;
