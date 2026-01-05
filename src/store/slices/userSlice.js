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
    tokenExpiry: null, 
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
      state.token = null;
      state.tokenExpiry = null;
    },

    loginUser: (state, action) => {
      const { name, email, userId, cart, token, tokenExpiry } = action.payload;
      state.isLoggedin = true;
      state.error = null;
      state.loading = false;
      state.user = { name, email, userId, cart };
      state.token = token;
      state.tokenExpiry = tokenExpiry || null;
      localStorage.setItem("userToken", token);
    },

    updateUserData: (state, action) => {
      const { name, email } = action.payload;
      state.user.name = name;
      state.user.email = email;
    },

    updateToken: (state, action) => {
      const { token, tokenExpiry } = action.payload;
      state.token = token;
      state.tokenExpiry = tokenExpiry;
      localStorage.setItem("userToken", token);
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
      state.tokenExpiry = null;
      localStorage.removeItem("userToken");
      document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    },
  },
});

export const { loginStart, loginUser, logoutUser, updateUserData, updateToken } =
  userSlice.actions;
export default userSlice.reducer;
