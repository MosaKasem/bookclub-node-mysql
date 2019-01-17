'use strict'

const router = require('express').Router()
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({extended: true}))

const db = require('../model/dbConnect')
db.connect((err) => {
  if (err) throw err
  console.log('connected to phpmyadmin')
})

const getAllBooks = () => {
  return new Promise(async resolve => {
    await db.query('SELECT * FROM books', (err, result) => {
      if (err) throw err
      resolve(result)
      // console.log('result: ', result)
    })
  })
}

/* const db = database.connect((err) => {
  if (err)

}) */

router.route('/books')
  .get(async (req, res) => {
    let books = await getAllBooks()
    console.log('books: ', books)
    // await console.log('books: ', books)
    res.render('books/everybook', {books})
  })

/* router.route('/createDB').get((req, res) => {
  let sql = 'CREATE DATABASE IF NOT EXISTS dbForBookAssignmentThree'
  db.query(sql, (err, result) => {
    if (err) throw err

    res.send('database created')
  })
}) */
/*
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
    if (err) throw err
    res.send('post table created')
  })
})

router.route('/addpost').get((req, res) => {
  let post = {title: 'maximus', description: 'Jimmyswagfiftyshades', bookinfo: 'sweden', author: 'JohnSnow', published: 1655}
  let sql = 'INSERT INTO books SET ?'
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
}) */

module.exports = router
