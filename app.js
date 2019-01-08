const express = require('express')
const mysql = require('mysql')
const exphbs = require('express-handlebars')
const bodyparser = require('body-parser')

const path = require('path')

const app = express()

app.use(bodyparser.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, 'public')))
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  partialsDir: __dirname + '/views/flash'
}))

app.set('view engine', 'handlebars')
/* app.use((req, res, next) => {
  // if (req.session.flash !== undefined) {
  res.locals.flash = req.session.flash
  delete req.session.flash
  // }
  console.log(req.session.flash)
  next()
}) */

app.listen('3000', () => {
  console.log('running')
})
