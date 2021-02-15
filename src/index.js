require('module-alias/register')
const express = require('express')
const api = require('./api')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/v1', api)
app.listen(3001, () => console.log('server running on port 3001'))