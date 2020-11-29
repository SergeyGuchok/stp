import authenticationApiService from '../../services/authentication'
import { saveToLocalStorage, removeFromLocalStorage } from "../../utils/localStorage";
import { TOKEN_KEY } from "../../constants";
import { USER_ACTION_TYPES } from "../../constants";
import { notification } from "antd";

const saveUserInfo = (data) => ({
  type: USER_ACTION_TYPES.SAVE_USER_INFO,
  payload: data
})

const removeUser = () => ({
  type: USER_ACTION_TYPES.REMOVE_USER
})

const authenticateAction = () => async (dispatch) => {
  try {
    const { userData } = await authenticationApiService.authenticate()
    if (userData.blocked) {
      notification.error({
        message: 'You have been banned'
      })

      return
    }
    if (userData) {
      dispatch(saveUserInfo(userData))
    }
  } catch (e) {
    console.log(e)
  }
}

const registerAction = (data) => async () => {
  try {
    const { message } = await authenticationApiService.register(data)
    notification.success({
      message,
      duration: 5
    })
    window.location.href = '/login'
  } catch (e) {
    console.log(e)
  }
}

const loginAction = (data) => async (dispatch) => {
  try {
    const { message, token, user } = await authenticationApiService.login(data)
    if (!token) {
      notification.error({
        message
      })

      return
    }

    if (user.blocked) {
      notification.error({
        message: 'You have been banned'
      })

      return
    }

    notification.success({
      message,
    })

    saveToLocalStorage(TOKEN_KEY, token)

    dispatch(saveUserInfo(user))

    window.location.href = '/home'
  } catch (e) {
    console.log(e)
  }
}

const logoutAction = () => (dispatch) => {
  try {
    removeFromLocalStorage(TOKEN_KEY)
    dispatch(removeUser())
    window.location.href = '/home'
  } catch (e) {
    console.log(e)
  }
}

export {
  authenticateAction,
  registerAction,
  loginAction,
  logoutAction
}
