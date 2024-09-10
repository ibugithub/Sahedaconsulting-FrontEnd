import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosRequests } from "@/components/utils/axiosRequests";
import { UserInterface } from "@/components/interface";

interface AuthState {
  isAuthenticated: boolean;
  isAdministrator: boolean;
  loogedInUser: UserInterface;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isAdministrator: false,
  loogedInUser: {} as UserInterface,
};

export const fetchLoggedInUser = createAsyncThunk('auth/fetchLoggedInUser', async () => {
  const protectedRoute = AxiosRequests();
  const url = '/users/getLoggedInUser/';
  const response = await protectedRoute.get(url);
  if (response.status === 201) {
    return response.data;
  }
})

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
  extraReducers(builder) {
    builder.addCase(fetchLoggedInUser.pending, (state) => {
      state.isAuthenticated = false;
      state.isAdministrator = false;
    })
    builder.addCase(fetchLoggedInUser.fulfilled, (state, action) => {
      const user = action.payload.user;
      if (user) {
        state.loogedInUser = action.payload;
        state.isAuthenticated = true;
        console.log("the action payload is", action.payload);
        const role = action.payload.user.role;
        if (role === "administrator") {
          state.isAdministrator = true;
        }
      }
    })
    builder.addCase(fetchLoggedInUser.rejected, (state) => {
      state.isAuthenticated = false;
      state.isAdministrator = false;
    })
  },
});

export const { login, administratorLogin, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;