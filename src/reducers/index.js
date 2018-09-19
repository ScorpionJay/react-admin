import { combineReducers } from "redux";
import table from "./table";
import loginReducer from "../containers/Login/reducer";
import tableReducer from "../containers/Table/reducer";
import bannerReducer from "../containers/Banner/reducer";

const rootReducer = combineReducers({
  table,
  tableReducer,
  bannerReducer,
  loginReducer
});

export default rootReducer;
