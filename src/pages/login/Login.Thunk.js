import { createAsyncThunk } from "@reduxjs/toolkit";
import { authenticationAPI } from "../../api/api";

export const authenticateUserThunk = createAsyncThunk(
  "login/authenticate",
  async (user) => {
    let response = await authenticationAPI.get(
      `/authUserCred/${user.userid}/${user.pswd}`
    );
    return response.data;
  }
);
