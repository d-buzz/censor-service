const { Router } = require('express')
const { censor } = require('../controllers/censorController')

const censorRouter = Router()

censorRouter.post('/buzz', censor)

module.exports = censorRouter