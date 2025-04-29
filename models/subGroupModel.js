const db = require('../config/db');

const sub_Group = {
    createsubGroup: async (subgroup_name, subgroup_profile_url, group_name, group_id, u_id) => {
        const query = 'INSERT INTO `sub_group` (subgroup_name,subgroup_profile_url, group_name, group_id, u_id) VALUES (?, ?,?, ?, ?)';
        const [result] = await db.execute(query, [subgroup_name, subgroup_profile_url, group_name, group_id, u_id]);
        return result.insertId;
    },

    getsubGroupById: async (subgroup_id) => {
        const query = 'SELECT * FROM `sub_group` WHERE subgroup_id = ?';
        const [rows] = await db.execute(query, [subgroup_id]);
        return rows[0];
    },

    deletesubGroupbyId: async (subgroup_id) => {
        const query = 'DELETE FROM `sub_group` WHERE subgroup_id = ?';
        const [result] = await db.execute(query, [subgroup_id]);
        return result.affectedRows > 0;
    },

    updatesubGroup: async (subgroup_id, subgroup_name, subgroup_profile_url) => {
        const query = 'UPDATE `sub_group` SET subgroup_name = ?, subgroup_profile_url = ? WHERE subgroup_id = ?';
        const [result] = await db.execute(query, [subgroup_name, subgroup_profile_url, subgroup_id]);
        return result.affectedRows > 0;
    },


}



module.exports = sub_Group;