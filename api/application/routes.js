const Router = require('koa-router')
const validator = require('koa-async-validator')

// middlewares
const error = require('./middlewares/error')
const validate = require('./middlewares/request-validation')
const customValidators = require('./models/validators')
const schemas = require('./models/request-schemas')

// application
const CreateTweet = require('./create-tweet')
const LikeTweet = require('./like-tweet')

const Routes = infrastructure => {
  const router = new Router()

  router.use(error)
  router.use(validator({ customValidators }))

  const createTweet = CreateTweet(infrastructure)
  const likeTweet = LikeTweet(infrastructure)

  router.post('/tweets', validate(schemas.createTweet), createTweet.create)
  router.put('/tweets/:id/likes', validate(schemas.likeTweet), likeTweet.like)

  return router
}

module.exports = Routes
