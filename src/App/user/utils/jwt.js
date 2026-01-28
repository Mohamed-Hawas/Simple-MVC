const jwt = require('jsonwebtoken');

const ACCESS_SECRET  = "sdfg98df11$nsd";
const REFRESH_SECRET = "asdf982asd&#+5";

const createAccessToken = (email) => {
    const token = jwt.sign({email}, ACCESS_SECRET,{expiresIn:'1h'})
    return token;
}

const createRefreshToken = (email) => {
    const token = jwt.sign({email}, REFRESH_SECRET,{expiresIn:'24h'})
    return token;  
}

const verifyAccessToken = (token) => {
    return jwt.verify(token, ACCESS_SECRET);
} 

const verifyRefreshToken = (token) => {
    return jwt.verify(token, REFRESH_SECRET);
} 

module.exports = {
    createAccessToken, 
    createRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
};