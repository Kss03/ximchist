const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
const {Op} = require('sequelize') // operators from sequelize
const ApiError = require('../error/apiError')
const {WorkExamples} = require('../models/models')

class workExamplesController {

  async getAll (req, res, next) {
    try {
      const {offset, limit} = req.query
      const [results] = await WorkExamples.sequelize.query(`SELECT * FROM work_examples OFFSET ${offset} LIMIT ${limit};`)
      res.status(200).json(results)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getFile (req, res, next) {
    const params = req.params
    res.status(200).json(params)
  }

  async postImages (req, res, next) {
    try {

      const {imgBefore, imgAfter} = req.files
      // get the file format
      const extBefore = path.extname(imgBefore.name)
      const extAfter = path.extname(imgAfter.name)

      const allowenExtension = ['.png','.jpg','.jpeg']; // format reference
      const maxSize = 5242880; // 5 megabyte, max size to uploading image

      if (!allowenExtension.includes(extBefore) || !allowenExtension.includes(extAfter)) {
        const message = 'Atteched files must be an image'
        next(ApiError.internal(message))
        return
      }
      if (imgBefore.size > maxSize || imgAfter > maxSize) {
        const message = 'Max size cannot be more than 5 MB'
        next(ApiError.internal(message))
        return
      }

      // create radom unique names for images
      let beforeName = uuid.v4() + extBefore
      let afterName = uuid.v4() + extAfter
  
      //save images on static folder
      const staticPath = path.resolve(__dirname, '..', 'static');

      imgBefore.mv(path.resolve(staticPath, beforeName))
      imgAfter.mv(path.resolve(staticPath, afterName))
      
      //create new row with file names in database
      const examplesRow   = await WorkExamples.create({
        before_img: beforeName,
        after_img: afterName
      })

      res.status(200).json('uploaded successfully')
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async delete (req, res, next) {
    try {
      const idForDeleting = req.body.id
      const staticPath = path.resolve(__dirname, '..', 'static');

      const fileNotFound = (e) => {
        if (e) return next(ApiError.internal(e.message))
      }

      const dataArr = await WorkExamples.findAll({
        attributes: ['id', 'before_img', 'after_img'],
        where: {
          id: {
            [Op.in]: idForDeleting
          }
        }
      })

      dataArr.forEach(async (obj) => {
        const {id, before_img, after_img} = obj
        fs.unlink(staticPath + "\\" + before_img, (e) => fileNotFound(e))
        fs.unlink(staticPath + "\\" + after_img, (e) => fileNotFound(e))

        await WorkExamples.destroy({
          where: {
            id: id
          }
        })
      })

      const actualizedData = await WorkExamples.findAll()
      res.status(200).json(actualizedData)
    }catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

}

module.exports = new workExamplesController()
