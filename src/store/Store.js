import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice"

const Store = configureStore({
  reducer:{
    user : userSlice
  }
})

export default Store