const hashPassword = require('../utils/hash').hashPassword;
const repo= require('../repositories/user.repository')

const addUser = async (email, password) => {
    const hashedPassword = await hashPassword(password); 
    await repo.createUser(email, hashedPassword);
}

module.exports = {addUser};