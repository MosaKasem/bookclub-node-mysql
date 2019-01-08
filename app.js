const express = require('express')
const mysql = require('mysql')
const exphbs = require('express-handlebars')

const app = express()

app.listen('3000', () => {
  console.log('App is running')
})
