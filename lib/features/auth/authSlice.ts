import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated : boolean;
  isAdministrator : boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isAdministrator: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    administratorLogin: (state) => {
      state.isAdministrator = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.isAdministrator = false;
    },
  },
});

export const { login, administratorLogin, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;