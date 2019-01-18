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
      description VARCHAR(30),
      bookinfo_id int,
      author text,
      published int,
      PRIMARY KEY(id)
    )`
  let sql2 = `CREATE TABLE IF NOT EXISTS region(
      
    )`
  db.query(`${sql}`, (err, result) => {
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
  let post = {
    title: `Daily Motivations for African Success`,
    description: 'Inside are the tools that will help you focus on the thoughts, attitudes',
    bookinfo: 'AFRICA',
    bookinfo_id: 3,
    author: 'Dennis Kimbro',
    published: 2011}
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
})

module.exports = router
