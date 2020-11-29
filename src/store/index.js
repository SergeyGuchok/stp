import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";
import createReducer from 'reducers'

export default createStore(
  createReducer(),
  composeWithDevTools(
    applyMiddleware(
      thunk,
    )
  )
)
