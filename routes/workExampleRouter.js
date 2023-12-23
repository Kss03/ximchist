
const Router = require('express')
const router = new Router()
const workExamplesController = require('../controllers/workExamplesController')
const AuthMiddleware = require("../middleware/AuthMiddleware");

//Get images
router.get('/getImages', workExamplesController.getAll)
router.get('/getImages/:id', workExamplesController.getFile)
router.post('/postImages', AuthMiddleware, workExamplesController.postImages)
router.delete('/delete', AuthMiddleware, workExamplesController.delete)


module.exports = router