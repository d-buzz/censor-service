const { auth } = require('@hiveio/hive-js')

const censor = (req, res) => {
  const wif = auth.toWif('coffeebender', '5Kin6RQ1JuFY8oMx4ZKDJrbAuGE56Hc5wzHzfDpuimu6JRi4UUZ', 'posting')
  res.json({ wif })
}

module.exports = { censor }