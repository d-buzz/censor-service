const { Router } = require('express')
const { censor, types, keypair } = require('@controllers/mainController')

const mainRouter = Router()

mainRouter.post('/add', censor)
mainRouter.get('/types', types)
mainRouter.get('/keypair', keypair)

module.exports = mainRouter