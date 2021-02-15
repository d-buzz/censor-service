const mysql = require('mysql')

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'dbuzz_censored'
})

module.exports = { db, mysql }