const router = require('express').Router();
const userController = require('../controllers/user.controller');



router.post('/signUp', userController.signUp);
router.post('/login', userController.login);
router.post('/refresh', userController.refresh);
router.get('/me', userController.getProfile)

module.exports = router;