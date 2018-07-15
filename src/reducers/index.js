import { combineReducers } from "redux";
import table from "./table";
import tableReducer from '../containers/Table/reducer';
import bannerReducer from '../containers/Banner/reducer';

const rootReducer = combineReducers({
  table,
  tableReducer,
  bannerReducer
});

export default rootReducer;
