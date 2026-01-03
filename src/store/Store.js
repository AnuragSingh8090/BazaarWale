import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice"
import contactSlice from './slices/contactSlice'

const Store = configureStore({
  reducer:{
    user : userSlice,
    contact : contactSlice
  }
})

export default Store