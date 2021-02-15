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

// const transaction = {author: 'someauthor', permlink: 'somepermlink', type: 1, wif: identity}

// const signerObject = crypto.createSign("RSA-SHA512")
// signerObject.update(JSON.stringify(transaction))
// const signature = signerObject.sign(pair["private"], "base64")

// console.log({ signature })

db.connect()
api.use('/', mainRouter)

module.exports = api