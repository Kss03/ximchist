
const Router = require("express");
const router = new Router();
const AuthController = require('../controllers/AuthController');
const AuthMiddleware = require('../middleware/AuthMiddleware');


//Admin autorization
router.post('/register', AuthController.registration);
router.post('/login', AuthController.login);
router.get('/check',AuthMiddleware, AuthController.check)

module.exports = router;