const express = require('express')
const passport = require('passport')
const UserService = require('../services/UserService')
const ResponseResult = require('../common/ResponseResult')

const UserRouter = express.Router()

UserRouter.put('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { userName, ...restUserData } = req.body.userData

  const result = await UserService.updateUser(userName, restUserData)

  ResponseResult(result, res)
})

UserRouter.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const result = await UserService.retrieveAllUsers()

  ResponseResult(result, res)
})

UserRouter.get('/:userName', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const result = await UserService.getUserByUsername(req.params.userName)

  ResponseResult(result, res)
})

UserRouter.delete('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const result = await UserService.deleteUser(req.body.userName)

  ResponseResult(result, res)
})

UserRouter.post('/block', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const result = await UserService.blockUser(req.body.userName)

  ResponseResult(result, res)
})

UserRouter.post('/unblock', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const result = await UserService.unblockUser(req.body.userName)

  ResponseResult(result, res)
})

module.exports = UserRouter
