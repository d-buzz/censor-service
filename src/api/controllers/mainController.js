

const { broadcast, config } = require('@hiveio/hive-js')

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
  
  if(!verified) return res.status(401).json({ message: 'invalid signature' })

  const CURRENT_TIMESTAMP = mysql.raw('CURRENT_TIMESTAMP()')
  const COLUMNS = { author, permlink, type_id, created_at: CURRENT_TIMESTAMP, updated_at: CURRENT_TIMESTAMP }

  addReply(author, permlink, type_id) 

  db.query('INSERT INTO LINKS SET ?', COLUMNS , (error, results) => {
    if(error) return res.sendStatus(500)
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
  res.json({pair: { private: pair['private'] }})
}

const list = (req, res) => {
  db.query('SELECT a.*, b.name as type FROM LINKS a, TYPES b WHERE a.type_id = b.id', (error, results) => {
    if(error) throw error
    res.json(results)
  })
}

const createMeta = () => {

  const meta = {
    app: 'dBuzz/v3.0.0',
    tags: ['censored', 'dbuzz'],
  }

  return JSON.stringify(meta)
}

const createPermlink = (title) => {
  const permlink = new Array(22).join().replace(/(.|$)/g, function(){return ((Math.random()*36)|0).toString(36)})
  return permlink
}


const addReply = (parent_author, parent_permlink, type) => {
  let reason = ''
  if(type === 1) {
    reason = '<b>Child Pornography</b>'
  } else {
    reason = '<b>Blatant Scam</b>'
  }

  let body = `This buzz has been marked as ${reason} on [d.buzz](https://d.buzz)`
  const json_metadata = createMeta()
  let permlink = createPermlink(body.substring(0, 100))
  permlink = `re-${permlink}`

  const op_comment = [[
    'comment',
    {
      'author': 'dbuzz',
      'title': '',
      'body': `${body.trim()}`,
      parent_author,
      parent_permlink,
      permlink,
      json_metadata,
    },
  ]]

  broadcastOperation(op_comment)
}

const broadcastOperation = (operations) => {
  config.set('rebranded_api', true)
  broadcast.updateOperations()
  return new Promise((resolve, reject) => {
    broadcast.send(
      {
        extensions: [],
        operations,
      },
      [identity],
      (error, result) => {
        if(error) {
          console.log(error)
        } else {
          console.log('dbuzz replied')
        }
      },
    )
  })
}

module.exports = { censor, types, keypair, list }