require('dotenv').config()
const mysql = require('mysql')
module.exports = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dbForBookAssignmentThree',
  multipleStatements: true
}).connect((err) => {
  if (err) console.log(err)
  console.log('connected to database!')
})
/* db.connect((err) => {
  if (err) console.log(err)
  console.log('connected to database')
}) */
