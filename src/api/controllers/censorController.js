const { auth } = require('@hiveio/hive-js')

const censor = (req, res) => {
  db.query('SELECT * FROM TYPES', (error, results) => {
    if(error) throw error
    const { author, permlink, type } = req.body
    const wif = auth.toWif('coffeebender', '5Kin6RQ1JuFY8oMx4ZKDJrbAuGE56Hc5wzHzfDpuimu6JRi4UUZ', 'posting')
    res.json({ wif, results, author, permlink })
  })
}

module.exports = { censor }