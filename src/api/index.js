const express = require('express')
const censorRouter = require('@routes/censorRouter')
const { db } = require('@config/database')
const api = express()

global.db = db
db.connect()

api.use('/censor', censorRouter)

module.exports = api