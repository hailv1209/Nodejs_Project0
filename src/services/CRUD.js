const connection = require("../config/database");
const User = require('../models/user')

const getAllUsers = async () => {
    let [results,field] = await connection.query('select * from Users')
    return results
}

const getUserById = async (userId) => {
    return await User.findById(userId).exec();
}

const updatedUserById = async (email, name, city, userId) => {
      await User.findOneAndUpdate({_id : userId},{email : email, name : name, city : city})
}

const deletedUserById = async (userId) => {
   await User.deleteOne({_id : userId})
}

module.exports = {
    getAllUsers, updatedUserById, getUserById, deletedUserById
}