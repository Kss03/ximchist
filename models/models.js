const db = require('../db');
const {DataTypes, Op} = require('sequelize');

const Users = db.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    required: true
  },
  password: {
    type: DataTypes.STRING,
    required: true
  },
  role: {
    type: DataTypes.STRING,
    required: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  last_login: {
    type: DataTypes.DATE,
  }
})

const Role = db.define('role', {
  id: {
    //in sequelize type SERIAL is define usage "INTEGER" type and autoIncrement property
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    unique: true
  }
})

const WorkExamples = db.define('work_examples', {
  id: {
    //in sequelize type SERIAL is define usage "INTEGER" type and autoIncrement property
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  before_img: {
    type: DataTypes.STRING,
    unique: true,
  },
  after_img: {
    type: DataTypes.STRING,
    unique: true,
  },
})

// Role.hasMany(Users)
// Users.belongsTo(Role, {
//   foreignKey: {name: 'role'},
//   as: 'name'
// })

module.exports = {
  WorkExamples,
  Users,
  Role
}