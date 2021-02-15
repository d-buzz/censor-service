

const censor = (req, res) => {
  const { author, permlink, type: type_id, wif = null } = req.body
  
  if(identity !== wif) return res.sendStatus(401)

  const CURRENT_TIMESTAMP = mysql.raw('CURRENT_TIMESTAMP()')
  const COLUMNS = { author, permlink, type_id, created_at: CURRENT_TIMESTAMP, updated_at: CURRENT_TIMESTAMP }

  db.query('INSERT INTO LINKS SET ?', COLUMNS , (error, results) => {
    if(error) res.sendStatus(500)
    res.json({ wif, results, author, permlink })
  })

}

const types = (req, res) => {
  db.query('SELECT * FROM TYPES', (error, results) => {
    if(error) throw error
    res.json(results)
  })
}

module.exports = { censor, types }