const db = require('../config/db');

const Groups = {
    creategroup: async (group_name, group_profile_url, group_created_user) => {
        const query = 'INSERT INTO `groups` (group_name, group_profile_url,group_created_user) VALUES (?, ?,?)';
        const [result] = await db.execute(query, [group_name, group_profile_url, group_created_user]);
        return result.insertId;
    },


    getGroupById: async (groupId) => {
        const query = 'SELECT * FROM `groups` WHERE group_id = ?';
        const [rows] = await db.execute(query, [groupId]);
        return rows[0];
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
