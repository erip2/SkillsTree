import * as types from "./actionTypes";

export function userLoggedIn(data) {
  return { type: types.USER_LOGGED_IN, data };
}

export function userLoggedOut() {
  return { type: types.USER_LOGGED_OUT };
}