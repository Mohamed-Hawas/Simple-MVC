const AppError = require('../../Common/Error/appError');

const UserAlreadyExistsError = new AppError("User already exists", 400);
const EmailOrPasswordIsWrong = new AppError("Email or password is wrong", 400);
const InvalidOrExpiredToken = new AppError("Invalid or expired token", 401);

module.exports = {
    UserAlreadyExistsError,
    EmailOrPasswordIsWrong,
    InvalidOrExpiredToken
};

