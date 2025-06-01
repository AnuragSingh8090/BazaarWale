import {createSlice} from '@reduxjs/toolkit'

const LoginSlice = createSlice({
    name : 'login',
    initialState :{
        isLoggedin : false,
    },
    reducers :{
        loginUser : (state)=>{
            state.isLoggedin = true;
        },
        logoutUser : (state)=>{
            state.isLoggedin = false;
        }
    }
})

export const {loginUser, logoutUser} = LoginSlice.actions;
export default LoginSlice.reducer;