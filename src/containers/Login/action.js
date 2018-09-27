/**
 * login action
 */
// import Request from "../../utils/request";
import Request from "../../utils/fetchWithTimeout";
import API from "../../utils/api";
import Storage from "../../utils/storage";

export const LOGIN = "Login";
export const LOGOUT = "Logout";

export const loginAction = data => async dispatch => {
  let response = await Request({
    url: API.login,
    method: "post",
    data
  });

  dispatch({
    type: LOGIN,
    data: {
      token: "test-token"
    }
  });
  Storage.put("token", "test-token");
};

export const logoutAction = data => async dispatch => {
  dispatch({
    type: LOGOUT,
    data: {
      token: null
    }
  });
  Storage.clear();
};
