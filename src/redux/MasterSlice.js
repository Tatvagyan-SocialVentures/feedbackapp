import { combineReducers } from "@reduxjs/toolkit";

// Slices
import LoginSlice from "../pages/login/Login.Slice";

const MasterSlice = combineReducers({
  LoginSlice,
});
export default MasterSlice;
