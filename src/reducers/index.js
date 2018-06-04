import { combineReducers } from "redux";
import table from "./table";
import tableReducer from '../containers/Table/reducer';

const rootReducer = combineReducers({
  table,
  tableReducer
});

export default rootReducer;
