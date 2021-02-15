

const verify = (author, permlink, type, signature) => {
  const transaction = {author, permlink, type, wif: identity}

  const verifierObject = crypto.createVerify("RSA-SHA512")
  verifierObject.update(JSON.stringify(transaction))

  const verified = verifierObject.verify(pair["public"], signature, "base64")
  console.log({ verified })
  return verified
}

const censor = (req, res) => {
  const { author, permlink, type: type_id, signature } = req.body
  const verified = verify(author, permlink, type_id, signature)
  
  if(!verified) return res.json({ pair })

  const CURRENT_TIMESTAMP = mysql.raw('CURRENT_TIMESTAMP()')
  const COLUMNS = { author, permlink, type_id, created_at: CURRENT_TIMESTAMP, updated_at: CURRENT_TIMESTAMP }

  db.query('INSERT INTO LINKS SET ?', COLUMNS , (error, results) => {
    if(error) res.sendStatus(500)
    res.json({ verified, results, author, permlink })
  })
}

const types = (req, res) => {
  db.query('SELECT * FROM TYPES', (error, results) => {
    if(error) throw error
    res.json(results)
  })
}

const keypair = (req, res) => {
  res.json({ pair })
}

module.exports = { censor, types, keypair }