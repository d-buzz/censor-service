const { Router } = require('express')
const { censor, types } = require('@controllers/mainController')

const mainRouter = Router()

mainRouter.post('/add', censor)
mainRouter.get('/types', types)

module.exports = mainRouter