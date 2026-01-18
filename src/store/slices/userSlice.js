import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../services/apiService";
import { sucessToast, errorToast } from "../../components/Toasters/Toasters";


export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      await apiService.logoutUser();
      localStorage.removeItem("userToken");
      sucessToast("Logout Successful!!");
      return true;
    } catch (error) {
      console.error("Logout failed:", error);
      errorToast("Logout failed. Please try again.");

      return rejectWithValue(
        error?.response?.data?.message || "Logout failed"
      );
    }
  }
);

const initialState = {
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
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    loginUser: (state, action) => {
      const { name, email, userId, cart, token, tokenExpiry } = action.payload;

      state.isLoggedin = true;
      state.loading = false;
      state.error = null;

      state.user = { name, email, userId, cart };
      state.token = token;
      state.tokenExpiry = tokenExpiry || null;

      localStorage.setItem("userToken", token);
    },

    updateUserData: (state, action) => {
      const { name, email, cart } = action.payload;

      if (name !== undefined) state.user.name = name;
      if (email !== undefined) state.user.email = email;
      if (cart !== undefined) state.user.cart = cart;
    },


    updateToken: (state, action) => {
      const { token, tokenExpiry } = action.payload;

      state.token = token;
      state.tokenExpiry = tokenExpiry;
      state.isLoggedin = Boolean(token);

      localStorage.setItem("userToken", token);
    },

    resetState: (state) => {
      state.isLoggedin = false;
      state.loading = false;
      state.error = null;
      state.user = {
        name: null,
        email: null,
        userId: null,
        cart: [],
      };
      state.token = null;
      state.tokenExpiry = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = {
          name: null,
          email: null,
          userId: null,
          cart: [],
        };
        state.isLoggedin = false;
        state.error = null;
        state.loading = false;
        state.token = null;
        state.tokenExpiry = null;
      })

      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Logout failed";
      });
  }

});

export const {
  loginStart,
  loginUser,
  updateUserData,
  updateToken,
  resetState,
} = userSlice.actions;

export default userSlice.reducer;
