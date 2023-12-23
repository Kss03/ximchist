const jwt = require('jsonwebtoken')
const apiError = require('../error/apiError')

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1] // Bearer asdasdasdasd

    if (!token) {
      return res.status(400).json({message: "User Not Authorized"})
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (e) {
    res.status(400).json({message: "User Not Authorized"})
  }
}