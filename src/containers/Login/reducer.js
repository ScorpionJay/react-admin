/*
 * @Author: jay
 * @Date: 2018-11-13 17:02:59
 * @Last Modified by:   jay
 * @Last Modified time: 2018-11-13 17:02:59
 */

import { LOGIN, LOGOUT } from "./action";

const initialState = {
  token: null
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, { ...action.data });
    case LOGOUT:
      return Object.assign({}, state, { ...action.data });
    default:
      return state;
  }
};

export default loginReducer;
