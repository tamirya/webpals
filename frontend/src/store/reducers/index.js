import { isLoggedIn, isAdmin } from "./userReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  isLoggedIn,
  isAdmin,
});

export default allReducers;
