const db = require('../db');
const {DataTypes, Op} = require('sequelize');

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

module.exports = {
  WorkExamples,
}