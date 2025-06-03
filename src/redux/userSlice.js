import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    email: "",
    isEmailVerified: false,
    mobile: "",
    isMobileVerified: false,
    password: "",
    cartItem: [],
    address: "",
    wishlistItem: [],
    isAccountActive: true,
  },
  reducers : {
    setUserData : (state, action)=>{
        state.username = "Anurag Kumar";
        state.email = "anuragkumarsingh154@gmail.com";
        state.isEmailVerified = false;
        state.mobile = "8090674352";
        state.isMobileVerified = false;
        state.password = "************";
        state.cartItem = [1,3,5,6,7];
        state.address = "04,sector 4, Near railway crossing, Lucknow";
        state.wishlistItem = [];
        state.isAccountActive = true;
    },
    removeUserData : (state)=>{
        state = {
            username: "",
            email: "",
            isEmailVerified: false,
            mobile: "",
            isMobileVerified: false,
            password: "",
            cartItem: [],
            address: "",
            wishlistItem: [],
            isAccountActive: true,
          }
    },
    updateCart : (state, action)=>{
        state.cartItem.push(action.payload)
    }
  }

});

export const {setUserData, removeUserData, updateCart} = UserSlice.actions;
export default UserSlice.reducer