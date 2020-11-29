import { combineReducers } from "redux";
import userReducer from './user'
import applicationsReducer from './applications'

const createReducer = () => combineReducers({
  user: userReducer,
  applications: applicationsReducer
})

export default createReducer
