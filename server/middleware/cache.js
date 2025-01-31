const redis = require('redis')
const client = redis.createClient(process.env.REDIS_URL)

module.exports = {
  cache: duration => (req, res, next) => {
    const lang = req.query.lang || 'en'
    const key = `faqs:${lang}`

    client.get(key, (err, data) => {
      if (data) {
        res.send(JSON.parse(data))
      } else {
        res.originalSend = res.send
        res.send = body => {
          client.setex(key, duration, body)
          res.originalSend(body)
        }
        next()
      }
    })
  },
  clearCache: (req, res, next) => {
    client.flushdb(() => next())
  }
}
