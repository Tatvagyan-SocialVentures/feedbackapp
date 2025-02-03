import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import MasterSlice from "./MasterSlice";

var logger = createLogger();
const Store = configureStore({
  reducer: MasterSlice,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), logger],
});

export default Store;
