const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const CONSTANTS = require('../../common/Constants')
const MongoClient = require('../../MongoClient')
const ResponseStatusTypes = require('../../common/ResponseStatusTypes')

const USER_ALREADY_EXISTS = 'User already exists'
const USER_WAS_CREATED = 'Successfully registered'
const SOMETHING_WENT_WRONG = 'Something went wrong'
const LOGIN_OR_USERNAME_WRONG = 'Wrong username or password'
const LOGIN_SUCCESS = 'Login Successful'

class AuthService {
  createResponse = (errors, status, message) => ({
    errors,
    status,
    message
  })

  findUser = async (userName, collection) => await collection.findOne({
    userName
  })

  getUsersCollection = async () => {
    const db = await MongoClient.db('stp')
    return await db.collection('users')
  }

  register = async (userData) => {
    try {
      const usersCollection = await Service.getUsersCollection()

      const user = await Service.findUser(userData.username, usersCollection)

      if (!!user) {
        return Service.createResponse(null, ResponseStatusTypes.FAIL, {
          message: USER_ALREADY_EXISTS
        })
      }

      const salt = bcrypt.genSaltSync(10)

      await usersCollection.insertOne({
        userName: userData.username,
        password: bcrypt.hashSync(userData.password, salt),
        role: 'user',
        blocked: false
      })

      return Service.createResponse(null, ResponseStatusTypes.OK, {
        message: USER_WAS_CREATED
      })
    } catch (e) {
      console.log(e)
      return Service.createResponse(e, ResponseStatusTypes.FAIL, {
        message: SOMETHING_WENT_WRONG
      })
    }
  }

  login = async (userData) => {
    try {
      const usersCollection = await Service.getUsersCollection()

      const user = await Service.findUser(userData.username, usersCollection)

      if (user) {
        const passwordResult = bcrypt.compareSync(userData.password, user.password)

        if (passwordResult) {
          return Service.createResponse(null, ResponseStatusTypes.OK, {
            message: LOGIN_SUCCESS,
            user,
            token: jwt.sign({
              userName: user.userName,
              userId: user._id,
            }, CONSTANTS.jwt, { expiresIn: 60 * 60 * 24 }),
            userId: user._id
          })
        }
      }

      return Service.createResponse(null, ResponseStatusTypes.UNAUTHORIZED, {
        message: LOGIN_OR_USERNAME_WRONG
      })
    } catch (e) {
      console.log(e)
      return Service.createResponse(e, ResponseStatusTypes.FAIL, {
        message: SOMETHING_WENT_WRONG
      })
    }
  }

  authenticate = async (userData) => {
    try {
      const usersCollection = await Service.getUsersCollection()

      const user = await Service.findUser(userData.userName, usersCollection)

      return Service.createResponse(null, ResponseStatusTypes.OK, {
        userData: user
      })
    } catch (e) {
      return Service.createResponse(e, ResponseStatusTypes.FAIL, {
        message: SOMETHING_WENT_WRONG
      })
    }
  }
}

const Service = new AuthService()

module.exports = Service
