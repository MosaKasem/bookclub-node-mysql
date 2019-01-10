let port = process.env.PORT || 3000

const express = require('express')
const database = require('./model/dbConnect')
const exphbs = require('express-handlebars')
const bodyparser = require('body-parser')

const path = require('path')

const app = express()

app.get('/', (req, res) => {
  res.send('hello')
})

app.get('/', require('./routes/booksRoutes'))

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
