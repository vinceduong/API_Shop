require('./db/connection')
require('./utils')
require('colors')

const express = require('express')

const PORT = 3000

const app = express()

const router = require('./router')

app.use('/', router)
const message = `Server is listening on port ${PORT}
Make requests at "http://localhost:3000/[METHOD_NAME]"`
app.listen(
  PORT,
  () => console.log(message.green)
)