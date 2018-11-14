/*
 * @Author: jay
 * @Date: 2018-11-13 17:14:29
 * @Last Modified by:   jay
 * @Last Modified time: 2018-11-13 17:14:29
 */

import { GET_LIST, SEARCH, PAGE_LIST } from "./action";

const initialState = {
  list: [],
  page: 1,
  pageSize: 10,
  total: 0,
  keyword: ""
};

const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST:
      return Object.assign({}, state, { ...action.data });
    case PAGE_LIST:
      return Object.assign({}, state, { ...action.data });
    default:
      return state;
  }
};

export default tableReducer;
