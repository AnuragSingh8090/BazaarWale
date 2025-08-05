import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      name: null,
      email: null,
      userId: null,
      cart: [],
    },
    isLoggedin: false,
    error: null,
    loading: false,
    token: null,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
      state.token = null;
    },

    loginError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.token = null;
    },

    loginUser: (state, action) => {
      const { name, email, userId, cart, token } = action.payload;
      state.isLoggedin = true;
      state.error = null;
      state.loading = false;
      state.user = { name, email, userId, cart };
      state.token = token;
      localStorage.setItem("userToken", token);
    },

    updateUserData: (state, action) => {
      const { name, email } = action.payload;
      state.user.name = name;
      state.user.email = email;
    },

    logoutUser: (state) => {
      state.isLoggedin = false;
      state.error = null;
      state.loading = false;
      state.user = {
        name: null,
        email: null,
        userId: null,
        cart: [],
      };
      state.token = null;
      localStorage.removeItem("userToken");
    },
  },
});

export const { loginStart, loginError, loginUser, logoutUser, updateUserData } =
  userSlice.actions;
export default userSlice.reducer;
