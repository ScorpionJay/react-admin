/**
 * banner action
 */
import Request from "../../utils/request";
import API from "../../utils/api";

export const GET_BANNER = "GET_BANNER";
export const ADD_BANNER = "ADD_BANNER";
export const UPDATE_BANNER = "UPDATE_BANNER";
export const DELETE_BANNER = "DELETE_BANNER";

export const getBannerAction = () => async dispatch => {
  let data = await Request({
    url: API.banner,
    method: "get",
    data: {}
  });

  dispatch({
    type: GET_BANNER,
    data
  });
};

export const addBannerAction = vo => async dispatch => {
  let data = await Request({
    url: API.addBanner,
    method: "post",
    data: vo
  });

  dispatch({
    type: ADD_BANNER,
    data
  });
};

export const updateBannerAction = vo => async dispatch => {
  let data = await Request({
    url: API.addBanner,
    method: "post",
    data: vo
  });

  dispatch({
    type: UPDATE_BANNER,
    data
  });
};

export const deleteBannerAction = id => async dispatch => {
  let data = await Request({
    url: API.deleteBanner,
    method: "get",
    data: { id }
  });

  dispatch({
    type: DELETE_BANNER,
    data: id
  });
};
