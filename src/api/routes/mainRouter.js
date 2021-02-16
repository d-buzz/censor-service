const { Router } = require('express')
const { censor, types, keypair, list } = require('@controllers/mainController')

const mainRouter = Router()

mainRouter.post('/add', censor)
mainRouter.get('/types', types)
mainRouter.get('/keypair', keypair)
mainRouter.get('/list', list)

module.exports = mainRouter