
const Router = require('express')
const router = new Router()
const workExamplesController = require('../controllers/workExamplesController')

//Get images
router.get('/getImages', workExamplesController.getAll)
router.get('/getImages/:id', workExamplesController.getFile)
router.post('/postImages', workExamplesController.postImages)
router.delete('/delete', workExamplesController.delete)


module.exports = router