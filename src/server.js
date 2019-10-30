require('./db/connection')
require('./utils')

const express = require('express')

const PORT = 3000

const app = express()

const router = require('./router')

app.use('/', router)

app.listen(
  PORT,
  () => console.log(`Server is listening on port ${PORT}`)
)