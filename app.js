let port = process.env.PORT || 3000

const express = require('express')
const mysql = require('mysql')
const exphbs = require('express-handlebars')
const bodyparser = require('body-parser')

const path = require('path')

const app = express()
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

app.get('/createDB', (req, res) => {
  let sql = 'CREATE DATABASE IF NOT EXISTS dbForBookAssignmentThree'
  db.query(sql, (err, result) => {
    if (err) throw err
    console.log(result)
    res.send('database created')
  })
})

app.get('/createTable', (req, res) => {
/*   let sql = `CREATE TABLE IF NOT EXISTS books(
    id int AUTO_INCREMENT,
    title VARCHAR(255),
    description VARCHAR(255),
    stats VARCHAR(255),
    author text(50),
    published int(255),
    FOREIGN KEY (stats) REFERENCES bookstats (stats),
    PRIMARY KEY(id))` */
  // let sql2 = `CREATE TABLE IF NOT EXISTS bookstats(stats VARCHAR(255))`
  db.query(sql, (err, result) => {
    if (err) console.log(err)
    console.log(result)
    res.send('post table created')
  })
})

app.get('/addpost', (req, res) => {
  let post = {title: 'titleoftitan', description: 'mahjog', stats: 'mahjog', author: 'mahjog', published: 255}
})

app.use(bodyparser.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, 'public')))
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  partialsDir: __dirname + '/views/flash'
}))

app.set('view engine', 'hbs')

app.listen(port, () => {
  console.log(`Server is running at port: localhost:${port}`)
})
