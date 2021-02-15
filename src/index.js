require('module-alias/register')

const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const api = require('./api')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/v1/censor', api)
app.listen(3001, () => console.log('server running on port 3001'))