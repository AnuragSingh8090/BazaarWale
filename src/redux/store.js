import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from './loginSlice'
import UserSlice from './userSlice'
const store = configureStore({
  reducer: {
    login : LoginSlice,
    user : UserSlice
  },
});


export default store