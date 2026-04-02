const { PrismaClient } = require('../../../generated/prisma');

// Single Prisma client instance for the whole app
const prisma = new PrismaClient();

module.exports = prisma;