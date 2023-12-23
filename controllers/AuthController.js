
const uuid = require("uuid");
const ApiError = require("../error/apiError");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const {validationResult} = require("express-validator");
const {Users, Role} = require("../models/models")

const generateJwt = (id, username, role) => {
  const payload = {
    id: id,
    username: username,
    role: role
  }
  return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "24h"})
}

class AuthController {
  async registration (req, res, next){
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError(400, {message: "Register Error", errors}))
      }

      const {username, password, email} = req.body
      const role = "USER"
      const hashPassword = bcrypt.hashSync(password, 7);
      const user = await Users.create({
        username: username,
        password: hashPassword,
        role: role,
        email: email
      })

      const token = generateJwt(user.id, user.username, user.role)
      return res.status(200).json({token})

    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async login(req, res, next) {
    try {
      console.log(req.body)
      const {username, password} = req.body
      const [results] = await Users.sequelize.query(`
        SELECT * FROM users
        WHERE username = '${username}';
      `)
      if (results.length === 0) {
        return next(ApiError.badRequest('User with this name does not exist'))
      }
      const user = results[0]
      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        return next(ApiError.badRequest('wrong password'))
      }
      if (user.role != "ADMIN") {
        return next(ApiError.badRequest('no access rights'))
      }
      const token = generateJwt(user.id, user.username, user.role)
      return res.status(200).json({token})

    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async check(req, res, next) {
    //если middleware проверил и норм, то просто обновляем токен у пользователя
    const token = generateJwt(req.user.id, req.user.username, req.user.role)
    return res.json({token})
  }
}


module.exports = new AuthController()