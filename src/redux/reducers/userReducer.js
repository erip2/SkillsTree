import * as types from "../actions/actionTypes";
import initialState from "./initialState";


export default function userReducer(state = initialState.user, action) {

  if (action.type === types.USER_LOGGED_IN) {
    return {
      ...state, logged: true, data: action.data
    }
  }

  if (action.type === types.USER_LOGGED_OUT) {
    return initialState.user
  }

  return state;
}