const express = require('express')
const api = express()

const { db, mysql } = require('@config/database')
const { auth } = require('@hiveio/hive-js')

const mainRouter = require('@routes/mainRouter')
const crypto = require("crypto")
const keypair = require("keypair")
const pair = keypair(1024)
const identity = '5Jmt1Gbj79xfGpMfmn64MH3k5xafJuMqxcc81T9KBnM1VGyzZaN'

global.db = db
global.mysql = mysql
global.identity = identity
global.pair = pair
global.crypto = crypto


db.connect()
api.use('/', mainRouter)

module.exports = api