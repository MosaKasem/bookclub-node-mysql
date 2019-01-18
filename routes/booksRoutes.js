'use strict'

const router = require('express').Router()
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({extended: true}))

const db = require('../model/dbConnect')
db.connect((err) => {
  if (err) throw err
  console.log('connected to phpmyadmin')
})

const retrieveData = (query) => {
  return new Promise(resolve => {
    db.query(query, (err, result) => {
      if (err) throw err
      resolve(result)
    })
  })
}

const getAllBooks = () => {
  return new Promise(async resolve => {
    let allbooks = await retrieveData('SELECT * FROM books')
    resolve(allbooks)
  })
}

/* const db = database.connect((err) => {
  if (err)

}) */

router.route('/books')
  .get(async (req, res) => {
    let books = await getAllBooks()
    console.log('books: ', books)
    res.render('books/everybook', {books})
  })

router.route('/longestbook')
  .get(async (req, res) => {
    let book = await db.query('SELECT title, booklength FROM books where booklength = (SELECT MAX(booklength) FROM books)', (err, result) => {
      if (err) throw err
      console.log(`longestbook--------------------\n`, result, `\nlongestbook--------------------`)
      res.render('books/longestbook', {result})
    })
  })
router.route('/eubooks')
  .get(async (req, res) => {
    let eubooks = await retrieveData(
      `SELECT * FROM books 
      INNER JOIN 
      region ON region.bookorigin_id = books.bookorigin_id 
      WHERE books.bookorigin_id = 1`)
    console.log('--------------------eubooks\n ', eubooks, '\n--------------------eubooks')
    res.render('books/eubooks', {eubooks})
  })

router.route('/createDB').get((req, res) => {
  let sql = 'CREATE DATABASE IF NOT EXISTS dbForBookAssignmentThree'
  db.query(sql, (err, result) => {
    if (err) throw err

    res.send('database created')
  })
})

router.route('/createTable').get((req, res) => {
  let sql = `CREATE TABLE IF NOT EXISTS books(
      id int(11) NOT NULL AUTO_INCREMENT,
      title VARCHAR(30),
      booklength int,
      bookorigin_id int,
      author text,
      published int,
      PRIMARY KEY(id)
    )`
  let sql2 = `CREATE TABLE IF NOT EXISTS region(
    bookorigin_id int, 
    bookorigin VARCHAR(50)
    )`
  db.query(`${sql2}`, (err, result) => {
    if (err) throw err
    res.send('post table created')
  })
})

/*
1 == EUROPE
2 == ASIA
3 == AFRICA
*/

router.route('/addpost').get((req, res) => {
  // for book
/*   let post = {
    title: `Who Went Out Of Africa`,
    booklength: 437,
    bookorigin_id: 3,
    author: 'Annonymous',
    published: 2016}
  let sql = 'INSERT INTO books SET ?' */
  // for region
/*   let post = {
    bookorigin_id: 3,
    bookorigin: 'Africa'
  }
  let sql = 'INSERT INTO region SET ?' */
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err
    res.send('post added')
  })
})

router.route('/selectPost/:weee').get((req, res) => {
  let sql = 'SELECT * FROM books'
  let query = db.query(sql, (err, results) => {
    if (err) throw err
  })
})
router.route('/selectPostUrl/:id').get((req, res) => {
  let sql = `SELECT * FROM books WHERE author="${req.params.id}"`
  let query = db.query(sql, (err, results) => {
    if (err) throw err
  })
})

module.exports = router
