
const Router = require('express');
const router = new Router();
const workExamplesRouter = require('./workExampleRouter')

router.use('/examples', workExamplesRouter);

module.exports = router;