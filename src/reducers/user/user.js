import { USER_ACTION_TYPES } from "../../constants";

const userReducer = (state = {
  currentUser: {},
  searchUser: {},
}, action) => {
  switch (action.type) {
    case USER_ACTION_TYPES.SAVE_USER_INFO:
      return {
        ...state,
        currentUser: {
          ...action.payload
        }
      }

    case USER_ACTION_TYPES.SAVE_SEARCH_USER:
      return {
        ...state,
        searchUser: {
          ...action.payload
        }
      }

    case USER_ACTION_TYPES.REMOVE_USER:
      return {
        currentUser: {},
        searchUser: {}
      }

    case USER_ACTION_TYPES.UPDATE_SEARCH_USER:
      return {
        ...state,
        searchUser: {
          ...state.searchUser,
          ...action.payload
        }
      }

    default:
      return state
  }
}

export default userReducer
