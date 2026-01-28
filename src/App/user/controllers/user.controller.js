const userService = require('../services/user.service');


const signUp = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        await userService.register(email, password);
        res.status(201).json({ msg: "User Created Successfully" });
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const tokens = await userService.login(email, password);
        res.status(200).json(tokens);
    } catch (error) {
        next(error);
    }
}

const refresh = async (req, res, next) => {
    try {
        const refreshToken = req.body.refreshToken;
        const accessToken = userService.renewAccessToken(refreshToken);
        res.status(200).json({accessToken});
    } catch (error) {
        next(error);
    }
}
const getProfile = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if(!token) return res.status(401).json({ msg: "Unauthorized!!" });
    try {
        const user = await userService.getUserProfileByToken(token);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

module.exports = {signUp, login, refresh, getProfile};