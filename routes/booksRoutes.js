const router = require('express').Router()

const db = require('../model/dbConnect')

/* const db = database.connect((err) => {
  if (err) console.log(err)
  console.log('connected to database')
}) */

router.route('/').get((req, res) => {
  res.send('hello')
})

router.route('/createDB').get((req, res) => {
  let sql = 'CREATE DATABASE IF NOT EXISTS dbForBookAssignmentThree'
  db.query(sql, (err, result) => {
    if (err) throw err
    console.log(result)
    res.send('database created')
  })
})

router.route('/createTable').get((req, res) => {
  let sql = `CREATE TABLE IF NOT EXISTS books(
      id int AUTO_INCREMENT,
      title VARCHAR(255),
      description VARCHAR(255),
      stats VARCHAR(255),
      author text(50),
      published int(255),
      FOREIGN KEY (stats) REFERENCES bookstats (stats),
      PRIMARY KEY(id))`
  // let sql2 = `CREATE TABLE IF NOT EXISTS bookstats(stats VARCHAR(255))`
  db.query(sql, (err, result) => {
    if (err) console.log(err)
    console.log(result)
    res.send('post table created')
  })
})

router.route('/addpost').get((req, res) => {
  let post = {title: 'titleoftitan', description: 'mahjog', stats: 'mahjog', author: 'mahjog', published: 1255}
  let sql = 'INSERT INTO books SET ?'
  let query = db.query(sql, post, (err, result) => {
    if (err) console.log(err)
    res.send('post added')
  })
})

router.route('/selectPost').get((req, res) => {
  let sql = 'SELECT * FROM books'
  let query = db.query(sql, (err, results) => {
    if (err) console.log(err)
    console.log(results)
  })
})
router.route('/selectPostUrl/:id').get((req, res) => {
  let sql = `SELECT * FROM books WHERE author="${req.params.id}"`
  let query = db.query(sql, (err, results) => {
    if (err) console.log(err)
    console.log(results)
  })
})

module.exports = router
