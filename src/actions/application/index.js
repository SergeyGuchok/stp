import applicationApiService from '../../services/application'
import { APPLICATION_ACTION_TYPES } from "../../constants";
import { notification } from "antd";

const saveApplications = (applications) => ({
  type: APPLICATION_ACTION_TYPES.SAVE_APPLICATION,
  payload: applications
})

const savePendingApplications = (applications) => ({
  type: APPLICATION_ACTION_TYPES.SAVE_PENDING_APPLICATIONS,
  payload: applications
})

const removeFromPendingState = (applicationId) => ({
  type: APPLICATION_ACTION_TYPES.REMOVE_FROM_PENDING_STATE,
  payload: applicationId
})

const removeFromMyApplications = (applicationId) => ({
  type: APPLICATION_ACTION_TYPES.REMOVE_FROM_MY_APPLICATIONS,
  payload: applicationId
})

const saveMyApplications = (applications) => ({
  type: APPLICATION_ACTION_TYPES.SAVE_MY_APPLICATIONS,
  payload: applications
})

const createApplication = (data) => async () => {
  try {
    const { message } = await applicationApiService.createApplication(data)
    notification.success({
      message,
      duration: 5
    })
  } catch (e) {
    notification.error({
      message: 'Something went wrong',
      duration: 5
    })
  }
}

const loadApplications = () => async (dispatch) => {
  try {
    const { applications } = await applicationApiService.loadApplications()
    dispatch(saveApplications(applications))
  } catch (e) {
    notification.error({
      message: 'Something went wrong',
      duration: 5
    })
  }
}

const loadPendingApplications = () => async (dispatch) => {
  try {
    const { applications } = await applicationApiService.loadPendingApplications()
    dispatch(savePendingApplications(applications))
  } catch (e) {
    notification.error({
      message: 'Something went wrong',
      duration: 5
    })
  }
}

const approveApplication = (applicationData) => async (dispatch) => {
  try {
    const { message } = await applicationApiService.updateApplication({
      applicationId: applicationData._id,
      state: 'completed'
    })

    notification.success({
      message,
      duration: 5
    })

    dispatch(removeFromPendingState(applicationData._id))
  } catch (e) {
    notification.error({
      message: 'Something went wrong',
      duration: 5
    })
  }
}

const closeApplication = (applicationData) => async (dispatch) => {
  try {
    const { message } = await applicationApiService.updateApplication({
      applicationId: applicationData._id,
      state: 'closed'
    })

    notification.success({
      message,
      duration: 5
    })

    dispatch(removeFromPendingState(applicationData._id))
  } catch (e) {
    notification.error({
      message: 'Something went wrong',
      duration: 5
    })
  }
}

const loadMyApplications = () => async (dispatch) => {
  try {
    const { applications } = await applicationApiService.loadMyApplications()
    dispatch(saveMyApplications(applications))
  } catch (e) {
    notification.error({
      message: 'Something went wrong',
      duration: 5
    })
  }
}

const deleteApplication = (applicationId) => async (dispatch) => {
  try {
    const { message } = await applicationApiService.deleteApplication({ applicationId })

    notification.success({
      message,
      duration: 5
    })

    dispatch(removeFromMyApplications(applicationId))
  } catch (e) {
    notification.error({
      message: 'Something went wrong',
      duration: 5
    })
  }
}

export {
  createApplication,
  loadApplications,
  loadPendingApplications,
  approveApplication,
  closeApplication,
  loadMyApplications,
  deleteApplication
}
