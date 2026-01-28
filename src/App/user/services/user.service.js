const { UserAlreadyExistsError, EmailOrPasswordIsWrong, InvalidOrExpiredToken} = require('../error');
const userModel = require('../models/user.model');
const comparePassword = require('../utils/hash').comparePassword;

const {
    createAccessToken, 
    createRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
} = require('../utils/jwt');

const register = async (email, password) =>{
    const user = userModel.findByEmail(email);
    if (user) throw UserAlreadyExistsError;
    userModel.pushUser(email, password);
}

const login = async (email, password) => {
    const user = userModel.findByEmail(email);
    if (!user) throw EmailOrPasswordIsWrong;

    const isMatch = await comparePassword(password, user.password);
    if(!isMatch) throw EmailOrPasswordIsWrong;

    const accessToken = createAccessToken(email);
    const refreshToken = createRefreshToken(email);
    return {accessToken, refreshToken} ;
}

const renewAccessToken = ( refreshToken ) => {
    try{
    const decoded = verifyRefreshToken(refreshToken);
    return createAccessToken(decoded.email);
    } catch {
        throw InvalidOrExpiredToken;
    }
}

const getUserProfileByToken = (token) => {
    const decoded = verifyAccessToken(token);
    const user = userModel.findByEmail(decoded.email);
    if (!user) throw InvalidOrExpiredToken;
    return user;
}

module.exports = {register, login, renewAccessToken, getUserProfileByToken};