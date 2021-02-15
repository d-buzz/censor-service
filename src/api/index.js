const express = require('express')
const api = express()

const { db, mysql } = require('@config/database')
const { auth } = require('@hiveio/hive-js')

const mainRouter = require('@routes/mainRouter')
const identity = auth.toWif('dbuzz', '5K8FC6woU1Y2LauGeXb41Ur1LrjqsKUskmqN3CWBzPinwJ91DME', 'posting')

global.db = db
global.mysql = mysql
global.identity = identity

db.connect()
api.use('/', mainRouter)

module.exports = api