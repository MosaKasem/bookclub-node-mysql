const router = require('express').Router()
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({extended: true}))

const db = require('../model/dbConnect')
db.connect((err) => {
  if (err) console.log(err)
  console.log('connected to database')
})
function executeQuery (query) {
  new Promise(async (resolve, reject) => {
    db.query(query, (err, result) => {
      if (err) console.log(err)
      resolve(result)
    })
  })
}
const getAllBooks = () => {
  new Promise(async (resolve, reject) => {
    const books = await executeQuery(`
    SELECT * FROM books`
  )
    resolve(books)
  })
}

/* const db = database.connect((err) => {
  if (err) console.log(err)
  console.log('connected to database')
}) */

router.route('/books').get(async (req, res) => {
  let books = await getAllBooks()
  const allbooks = {
    everybook: books.map((book) => {
      return {
        title: book.title
      }
    })
  }
  res.render('books/everybook', {allbooks})
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
      id int(11) NOT NULL AUTO_INCREMENT,
      title VARCHAR(30),
      description VARCHAR(30),
      bookinfo VARCHAR(30),
      author text,
      published int,
      PRIMARY KEY(id)
    )`
  let sql2 = `CREATE TABLE IF NOT EXISTS bookcategory()`
  db.query(`${sql}; ${sql2}`, (err, result) => {
    if (err) console.log(err)
    console.log(result)
    res.send('post table created')
  })
})

router.route('/addpost').get((req, res) => {
  let post = {title: 'maximus', description: 'Jimmyswagfiftyshades', bookinfo: 'sweden', author: 'JohnSnow', published: 1655}
  let sql = 'INSERT INTO books SET ?'
  let query = db.query(sql, post, (err, result) => {
    if (err) console.log(err)
    res.send('post added')
  })
})

router.route('/selectPost/:weee').get((req, res) => {
  console.log(req.params.weee)
  let sql = 'SELECT * FROM books'
  let query = db.query(sql, (err, results) => {
    if (err) console.log(err)
    console.log(results)
  })
})
router.route('/selectPostUrl/:id').get((req, res) => {
  console.log('\n')
  let sql = `SELECT * FROM books WHERE author="${req.params.id}"`
  let query = db.query(sql, (err, results) => {
    if (err) console.log(err)
    console.log(results)
  })
})

module.exports = router
