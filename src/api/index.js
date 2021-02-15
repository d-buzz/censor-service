const express = require('express')
const censorRouter = require('./routes/censorRouter')
const api = express()

api.use('/censor', censorRouter)

module.exports = api