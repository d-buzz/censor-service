const express = require('express')
const api = require('./api')
const app = express()

app.use('/api/v1', api)

app.listen(3001, () => console.log('server running on port 3001'))