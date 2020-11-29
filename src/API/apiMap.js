const ApiUri = 'http://localhost:8000'

const auth = () => ApiUri + '/auth'
auth.register = () => auth() + '/register'
auth.login = () => auth() + '/login'
auth.authenticate = () => auth() + '/authenticate'

const user = () => ApiUri + '/user'
user.findByUsername = (username) => user() + `/${username}`
user.block = () => user() + '/block'
user.unblock = () => user() + '/unblock'

const application = () => ApiUri + '/application'
application.pending = () => application() + '/pending'
application.my = () => application() + '/my'

const apiMap = {
  auth,
  user,
  application
}
export default apiMap
