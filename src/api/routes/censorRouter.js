const { Router } = require('express')
const { censor } = require('../controllers/censorController')

const censorRouter = Router()

censorRouter.get('/buzz', censor)

module.exports = censorRouter