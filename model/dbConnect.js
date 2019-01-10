require('dotenv').config()
const mysql = require('mysql')
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dbForBookAssignmentThree',
  multipleStatements: true
})
db.connect((err) => {
  if (err) console.log(err)
  console.log('connected to database')
})
