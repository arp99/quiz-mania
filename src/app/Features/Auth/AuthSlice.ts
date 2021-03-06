import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthInitialState, UserSignUpDetails } from "../../Types/Auth.types";
import {
  LoginUserWithCredentials,
  signUp,
} from "./services/UserAuthManagement";

export const loginUser = createAsyncThunk(
  "Auth/loginuser",
  async (reqArgs: { email: string; password: string }) => {
    const { email, password } = reqArgs;
    const response = await LoginUserWithCredentials(email, password);
    return response.data.token;
  }
);

export const guestLogin = createAsyncThunk(
  "Auth/guestLogin",
  async (reqArgs: { email: string; password: string }) => {
    const { email, password } = reqArgs;
    const response = await LoginUserWithCredentials(email, password);
    return response.data.token;
  }
);

export const signUpUser = createAsyncThunk(
  "Auth/signUpUser",
  async (reqArgs: UserSignUpDetails) => {
    const { firstName, lastName, email, password } = reqArgs;
    const response = await signUp(firstName, lastName, email, password);
    return response.data;
  }
);

const initialState: AuthInitialState = {
  token: localStorage.getItem("token") || null,
  authStatus: localStorage.getItem("token") ? "fulfilled" : "idle",
  guestLoginStatus: localStorage.getItem("token") ? "fulfilled" : "idle",
  registerStatus: "idle",
  authError: null,
};

export const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    logOutUser: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.authStatus = "idle";
      state.authError = null;
    },
    resetAuthState: (state) => {
      state.authStatus = "idle";
      state.registerStatus = "idle";
      state.authError = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.authStatus = "loading";
      state.authError = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.token = action.payload;
      state.authStatus = "fulfilled";
      localStorage.setItem("token", action.payload);
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.authStatus = "error";
    });

    builder.addCase(signUpUser.pending, (state) => {
      state.registerStatus = "loading";
      state.authError = null;
    });
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.registerStatus = "fulfilled";
    });
    builder.addCase(signUpUser.rejected, (state) => {
      state.registerStatus = "error";
    });
    builder.addCase(guestLogin.pending, (state) => {
      state.guestLoginStatus = "loading";
      state.authError = null;
    });
    builder.addCase(guestLogin.fulfilled, (state, action) => {
      state.token = action.payload;
      state.guestLoginStatus = state.authStatus = "fulfilled";
      localStorage.setItem("token", action.payload);
    });
    builder.addCase(guestLogin.rejected, (state) => {
      state.authStatus = "error";
    });
  },
});

export const { logOutUser, resetAuthState } = AuthSlice.actions;
export default AuthSlice.reducer;
