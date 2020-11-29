import apiMap from "../../API/apiMap";
import { apiGet, apiPost } from '../../API/apiRequest'

class Authentication {
  register = (data) => apiPost(apiMap.auth.register(), data)

  login = (data) => apiPost(apiMap.auth.login(), data)

  authenticate = () => apiGet(apiMap.auth.authenticate())
}
export default new Authentication()
