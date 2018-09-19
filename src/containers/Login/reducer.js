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
