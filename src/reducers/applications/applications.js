import { APPLICATION_ACTION_TYPES } from "../../constants";

const userReducer = (state = {
  list: [],
  pending: [],
  my: []
}, action) => {
  switch (action.type) {
    case APPLICATION_ACTION_TYPES.SAVE_APPLICATION:
      return {
        ...state,
        list: action.payload
      }

    case APPLICATION_ACTION_TYPES.SAVE_PENDING_APPLICATIONS:
      return {
        ...state,
        pending: action.payload
      }

    case APPLICATION_ACTION_TYPES.SAVE_MY_APPLICATIONS:
      return {
        ...state,
        my: action.payload
      }

    case APPLICATION_ACTION_TYPES.REMOVE_FROM_PENDING_STATE:
      return {
        ...state,
        pending: state.pending.filter((item) => item._id !== action.payload)
      }

    case APPLICATION_ACTION_TYPES.REMOVE_FROM_MY_APPLICATIONS:
      return {
        ...state,
        my: state.my.filter((item) => item._id !== action.payload)
      }

    default:
      return state
  }
}

export default userReducer
