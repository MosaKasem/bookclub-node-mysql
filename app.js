let port = process.env.PORT || 3000

const express = require('express')
const exphbs = require('express-handlebars')
const bodyparser = require('body-parser')

const path = require('path')

const app = express()

app.use(bodyparser.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, 'public')))
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  partialsDir: __dirname + '/views/flash'
}))

app.set('view engine', 'hbs')

app.use('/', require('./routes/booksRoutes'))

app.listen(port, () => {
  console.log(`Server is running at port: localhost:${port}`)
})
