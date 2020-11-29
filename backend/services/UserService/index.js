const MongoClient = require('../../MongoClient')
const ResponseStatusTypes = require('../../common/ResponseStatusTypes')

const SOMETHING_WENT_WRONG = 'Something went wrong'

class UserService {
  createResponse = (errors, status, message) => ({
    errors,
    status,
    message
  })

  getUsersCollection = async () => {
    const db = await MongoClient.db('stp')
    return await db.collection('users')
  }

  updateUser = async (userName, dataToUpdate) => {
    try {
      const usersCollection = await Service.getUsersCollection()

      await usersCollection.updateOne({ userName }, {
        $set: { ...dataToUpdate }
      })

      return Service.createResponse(null, ResponseStatusTypes.OK, {
        message: 'User was updated'
      })
    } catch (e) {
      console.log(e)
      return Service.createResponse(e, ResponseStatusTypes.FAIL, {
        message: SOMETHING_WENT_WRONG
      })
    }
  }

  retrieveAllUsers = async () => {
    try {
      const usersCollection = await Service.getUsersCollection()

      const users = await usersCollection.find().toArray()

      return Service.createResponse(null, ResponseStatusTypes.OK, {
        users
      })
    } catch (e) {
      console.log(e)
      return Service.createResponse(e, ResponseStatusTypes.FAIL, {
        message: SOMETHING_WENT_WRONG
      })
    }
  }

  blockUser = async (userName) => {
    try {
      const usersCollection = await Service.getUsersCollection()

      await usersCollection.updateOne({ userName }, {
        $set: {
          blocked: true
        }
      })

      return Service.createResponse(null, ResponseStatusTypes.OK, {
        message: 'User was banned'
      })
    } catch (e) {
      console.log(e)
      return Service.createResponse(e, ResponseStatusTypes.FAIL, {
        message: SOMETHING_WENT_WRONG
      })
    }
  }

  unblockUser = async (userName) => {
    try {
      const usersCollection = await Service.getUsersCollection()

      await usersCollection.updateOne({ userName }, {
        $set: {
          blocked: false
        }
      })

      return Service.createResponse(null, ResponseStatusTypes.OK, {
        message: 'User was unbanned'
      })
    } catch (e) {
      console.log(e)
      return Service.createResponse(e, ResponseStatusTypes.FAIL, {
        message: SOMETHING_WENT_WRONG
      })
    }
  }

  deleteUser = async (userName) => {
    try {
      const usersCollection = await Service.getUsersCollection()
      console.log(userName)
      await usersCollection.deleteOne({
        userName
      })

      return Service.createResponse(null, ResponseStatusTypes.OK, {
        message: 'User was deleted'
      })
    } catch (e) {
      console.log(e)
      return Service.createResponse(e, ResponseStatusTypes.FAIL, {
        message: SOMETHING_WENT_WRONG
      })
    }
  }

  getUserByUsername = async (userName) => {
    try {
      const usersCollection = await Service.getUsersCollection()

      const user = await usersCollection.findOne({ userName })

      if (user) {
        return Service.createResponse(null, ResponseStatusTypes.OK, {
          user
        })
      }

      return Service.createResponse(null, ResponseStatusTypes.FAIL, {
        user: null
      })
    } catch (e) {
      console.log(e)
      return Service.createResponse(e, ResponseStatusTypes.FAIL, {
        message: SOMETHING_WENT_WRONG
      })
    }
  }
}

const Service = new UserService()

module.exports = Service
