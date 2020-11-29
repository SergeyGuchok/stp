import userApiService from '../../services/user'
import { USER_ACTION_TYPES } from "../../constants";
import {notification} from "antd";

const saveSearchUser = (userData) => ({
  type: USER_ACTION_TYPES.SAVE_SEARCH_USER,
  payload: userData
})

const updateSearchUser = ({ userName, ...restUpdatedData }) => ({
  type: USER_ACTION_TYPES.UPDATE_SEARCH_USER,
  payload: restUpdatedData
})

const findUserByUsername = (userName) => async (dispatch) => {
  try {
    const { user } = await userApiService.findUserByUsername(userName)

    if (user) {
      dispatch(saveSearchUser(user))
      notification.success({
        message: 'User was found',
        duration: 5
      })
    } else {
      notification.error({
        message: 'Could not find user',
        duration: 5
      })
    }
  } catch (e) {
    notification.error({
      message: 'Something went wrong',
      duration: 5
    })
  }
}

const removeUser = (userName) => async () => {
  try {
    const { message } = await userApiService.removeUser({ userName })
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

const blockUser = (userName) => async (dispatch) => {
  try {
    const { message } = await userApiService.blockUser({ userName })
    notification.success({
      message,
      duration: 5
    })
    dispatch(updateSearchUser({ blocked: true }))
  } catch (e) {
    notification.error({
      message: 'Something went wrong'
    })
  }
}

const unblockUser = (userName) => async (dispatch) => {
  try {
    const { message } = await userApiService.unblockUser({ userName })
    notification.success({
      message
    })
    dispatch(updateSearchUser({ blocked: false }))
  } catch (e) {
    notification.error({
      message: 'Something went wrong'
    })
  }
}

const updateUser = (userData) => async (dispatch) => {
  try {
    const { message } = await userApiService.updateUser({ userData })
    notification.success({
      message,
      duration: 5
    })
    dispatch(updateSearchUser(userData))
  } catch (e) {
    notification.error({
      message: 'Something went wrong'
    })
  }
}

export {
  findUserByUsername,
  removeUser,
  blockUser,
  unblockUser,
  updateUser
}
