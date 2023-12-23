
const Router = require('express');
const router = new Router();
const workExamplesRouter = require('./workExampleRouter');
const AuthRouter = require('./AuthRouter');
const AuthMiddleware = require("../middleware/AuthMiddleware")


router.use('/examples', AuthMiddleware, workExamplesRouter);
router.use('/auth', AuthRouter);

module.exports = router;