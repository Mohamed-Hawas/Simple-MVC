const prisma = require('../../../Common/DB/prisma');
const { hashPassword } = require('../utils/hash');

const findByEmail = async (_email) => {
    return await prisma.user.findUnique({
        where: { email: _email },
    });
};

const createUser = async (_email, _hashedPassword) => {
    return await prisma.user.create({
        data: {
            email: _email,
            password: _hashedPassword,
        },
    });
};

module.exports = { findByEmail, createUser };