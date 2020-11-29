const express = require('express')
const AuthService = require('../services/AuthService')
const passport = require('passport')
const ResponseResult = require('../common/ResponseResult')

const AuthRouter = express.Router()

AuthRouter.post('/register', async (req, res) => {
  const userData = req.body

  const result = await AuthService.register(userData)

  ResponseResult(result, res)
})

AuthRouter.post('/login', async (req, res) => {
  const userData = req.body

  const result = await AuthService.login(userData)

  ResponseResult(result, res)
})

AuthRouter.get('/authenticate', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const user = req.user

  const result = await AuthService.authenticate(user)

  ResponseResult(result, res)
})

module.exports = AuthRouter
