import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user_id : 0,
    email : '',
    isAuthenticated : false,
    isSessionChecked: false,
}

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        saveAuth: (state,action)=>{
            state.user_id = action.payload.user_id;
            state.isAuthenticated = action.payload.isAuthenticated;
            state.isSessionChecked = action.payload.isSessionChecked;
        },
        saveEmail : (state,action)=>{
            state.email = action.payload
        },
        logout : (state)=>{
            state.user_id = null;
            state.isAuthenticated = false;
            localStorage.removeItem('userId');
        }
    },
})

export const { saveAuth, saveEmail } = userInfoSlice.actions;

export default userInfoSlice.reducer;
