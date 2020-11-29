import apiMap from "../../API/apiMap";
import { apiGet, apiPost, apiPut, apiDelete } from '../../API/apiRequest'

class ApplicationService {
  createApplication = (applicationData) => apiPost(apiMap.application(), applicationData)

  loadApplications = () => apiGet(apiMap.application())

  loadMyApplications = () => apiGet(apiMap.application.my())

  deleteApplication = (application) => apiDelete(apiMap.application(), application)

  loadPendingApplications = () => apiGet(apiMap.application.pending())

  updateApplication = (applicationData) => apiPut(apiMap.application(), applicationData)
}

export default new ApplicationService()
