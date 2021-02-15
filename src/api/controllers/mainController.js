

const censor = (req, res) => {
  const { author, permlink, type, wif = null } = req.body
  if(identity !== wif) {
    res.sendStatus(401)
  } else {
    db.query('SELECT * FROM TYPES', (error, results) => {
      if(error) throw error
      res.json({ wif, results, author, permlink })
    })
  }
}

const types = (req, res) => {
  db.query('SELECT * FROM TYPES', (error, results) => {
    if(error) throw error
    res.json(results)
  })
}

module.exports = { censor, types }