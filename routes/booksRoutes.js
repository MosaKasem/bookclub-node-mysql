const router = require('express').Router()

router.get('/createDB', (req, res) => {
  let sql = 'CREATE DATABASE IF NOT EXISTS dbForBookAssignmentThree'
  db.query(sql, (err, result) => {
    if (err) throw err
    console.log(result)
    res.send('database created')
  })
})

router.get('/createTable', (req, res) => {
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
  db.query(sql2, (err, result) => {
    if (err) console.log(err)
    console.log(result)
    res.send('post table created')
  })
})

router.get('/addpost', (req, res) => {
  let post = {title: 'titleoftitan', description: 'mahjog', stats: 'mahjog', author: 'mahjog', published: 1255}
  let sql = 'INSERT INTO books SET ?'
  let query = db.query(sql, post, (err, result) => {
    if (err) console.log(err)
    res.send('post added')
  })
})

router.get('/selectPost', (req, res) => {
  let sql = 'SELECT * FROM books'
  let query = db.query(sql, (err, results) => {
    if (err) console.log(err)
    console.log(results)
  })
})
router.get('/selectPostUrl/:id', (req, res) => {
  let sql = `SELECT * FROM books WHERE author="${req.params.id}"`
  let query = db.query(sql, (err, results) => {
    if (err) console.log(err)
    console.log(results)
  })
})

module.exports = router
