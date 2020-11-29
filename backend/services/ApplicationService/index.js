const APPLICATION_STATE = require('../../common/ApplicationState')
const MongoClient = require('../../MongoClient')
const ResponseStatusTypes = require('../../common/ResponseStatusTypes')
const ObjectId = require('mongodb').ObjectId

const SOMETHING_WENT_WRONG = 'Something went wrong'
const APPLICATION_WAS_ADDED = 'Application was added'

const STATE_TO_RESPONSE_MAPPER = {
  completed: 'Application was approved',
  closed: 'Application was closed'
}

class ApplicationService {
  createResponse = (errors, status, message) => ({
    errors,
    status,
    message
  })

  findApplication = async (userName, collection) => await collection.findOne({
    userName
  })

  getApplicationsCollection = async () => {
    const db = await MongoClient.db('stp')
    return await db.collection('applications')
  }

  createApplication = async (applicationData, userName) => {
    try {
      const applicationsCollection = await Service.getApplicationsCollection()

      const application = {
        ...applicationData,
        state: APPLICATION_STATE.REVIEWING,
        createdBy: userName
      }

      await applicationsCollection.insertOne(application)

      return Service.createResponse(null, ResponseStatusTypes.OK, {
        message: APPLICATION_WAS_ADDED
      })
    } catch (e) {
      console.log(e)
      return Service.createResponse(e, ResponseStatusTypes.FAIL, {
        message: SOMETHING_WENT_WRONG
      })
    }
  }

  loadApplications = async () => {
    try {
      const applicationsCollection = await Service.getApplicationsCollection()

      const applications = await applicationsCollection.find({ state: APPLICATION_STATE.COMPLETED }).toArray()

      return Service.createResponse(null, ResponseStatusTypes.OK, {
        applications
      })
    } catch (e) {
      console.log(e)
      return Service.createResponse(e, ResponseStatusTypes.FAIL, {
        message: SOMETHING_WENT_WRONG
      })
    }
  }

  loadMyApplications = async (userName) => {
    try {
      const applicationsCollection = await Service.getApplicationsCollection()

      const applications = await applicationsCollection.find({ createdBy: userName }).toArray()

      return Service.createResponse(null, ResponseStatusTypes.OK, {
        applications
      })
    } catch (e) {
      console.log(e)
      return Service.createResponse(e, ResponseStatusTypes.FAIL, {
        message: SOMETHING_WENT_WRONG
      })
    }
  }

  loadPendingApplications = async () => {
    try {
      const applicationsCollection = await Service.getApplicationsCollection()

      const applications = await applicationsCollection.find({ state: APPLICATION_STATE.REVIEWING }).toArray()

      return Service.createResponse(null, ResponseStatusTypes.OK, {
        applications
      })
    } catch (e) {
      console.log(e)
      return Service.createResponse(e, ResponseStatusTypes.FAIL, {
        message: SOMETHING_WENT_WRONG
      })
    }
  }

  updateApplication = async (applicationId, dataToUpdate) => {
    try {
      const applicationCollection = await Service.getApplicationsCollection()

      await applicationCollection.updateOne({ _id: ObjectId(applicationId) }, {
        $set: { ...dataToUpdate }
      })

      return Service.createResponse(null, ResponseStatusTypes.OK, {
        message: STATE_TO_RESPONSE_MAPPER[dataToUpdate.state]
      })
    } catch (e) {
      console.log(e)
      return Service.createResponse(e, ResponseStatusTypes.FAIL, {
        message: SOMETHING_WENT_WRONG
      })
    }
  }

  deleteApplication = async (applicationId) => {
    try {
      const applicationCollection = await Service.getApplicationsCollection()

      await applicationCollection.deleteOne({ _id: ObjectId(applicationId)})

      return Service.createResponse(null, ResponseStatusTypes.OK, {
        message: 'Application was deleted'
      })
    } catch (e) {
      console.log(e)
      return Service.createResponse(e, ResponseStatusTypes.FAIL, {
        message: SOMETHING_WENT_WRONG
      })
    }
  }
}

const Service = new ApplicationService()

module.exports = Service
