'use strict'
require('dotenv').config()
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dbForBookAssignmentThree',
  multipleStatements: true
})/* .connect((err) => {
  if (err) console.log(err)
  console.log('connected to database!')
}) */

module.exports = connection
/* db.connect((err) => {
  if (err) console.log(err)
  console.log('connected to database')
}) */
