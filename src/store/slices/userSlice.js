import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: null,
    email: null,
    userId: null,
    cart: [],
  },
  isLoggedIn: false,
  error: null,
  loading: false,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.error = null;
    },

    stopLoading: (state) => {
      state.loading = false;
      state.error = null;
    },

    loginUser: (state, action) => {
      const { name, email, userId, cart, token } = action.payload;
      state.isLoggedIn = true;
      state.loading = false;
      state.error = null;
      state.user = { name, email, userId, cart };
      if (token) {
        state.token = token;
        localStorage.setItem("userToken", token);
      }
    },

    updateUserData: (state, action) => {
      const { name, email, cart } = action.payload;
      if (name !== undefined) state.user.name = name;
      if (email !== undefined) state.user.email = email;
      if (cart !== undefined) state.user.cart = cart;
    },


    updateToken: (state, action) => {
      const { token } = action.payload;
      if (!token) return
      state.token = token;
      localStorage.setItem("userToken", token);
    },

    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.loading = false;
      state.error = null;
      state.user = {
        name: null,
        email: null,
        userId: null,
        cart: [],
      };
      state.token = null;
      localStorage.removeItem("userToken")
    },
  },



});

export const {
  startLoading,
  stopLoading,
  loginUser,
  updateUserData,
  updateToken,
  logoutUser,
} = userSlice.actions;

export default userSlice.reducer;
