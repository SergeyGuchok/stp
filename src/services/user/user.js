import apiMap from "../../API/apiMap";
import {apiDelete, apiGet, apiPost, apiPut} from '../../API/apiRequest'

class User {
  findUserByUsername = (username) => apiGet(apiMap.user.findByUsername(username))

  removeUser = (userName) => apiDelete(apiMap.user(), userName)

  blockUser = (userName) => apiPost(apiMap.user.block(), userName)

  unblockUser = (userName) => apiPost(apiMap.user.unblock(), userName)

  updateUser = (userData) => apiPut(apiMap.user(), userData)
}
export default new User()
