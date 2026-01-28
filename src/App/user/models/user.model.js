const hashPassword = require('../utils/hash').hashPassword;
const users = [];

const pushUser = async (email, password) => {
    const hashedPassword = await hashPassword(password); 
    const user = {email, password: hashedPassword};
    users.push(user);
}

const findByEmail = (email) => {
    const user = users.find( u => u.email === email );
    return user || null;
}

module.exports = {pushUser, findByEmail};