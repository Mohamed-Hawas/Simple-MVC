const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

const comparePassword = async (password, encrypted) => {
    return await bcrypt.compare(password, encrypted);  
}

module.exports = {hashPassword, comparePassword};