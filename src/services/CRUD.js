const connection = require("../config/database");


const getAllUsers = async () => {
    let [results,field] = await connection.query('select * from Users')
    return results
}

const updatedUserById = async (email, name, city, userId) => {
    let [results, field] = await connection.query(
        `UPDATE Users 
        SET email = ?, name = ?, city = ? 
        WHERE id = ?`,
        [email, name, city, userId]
      );
}

module.exports = {
    getAllUsers, updatedUserById
}