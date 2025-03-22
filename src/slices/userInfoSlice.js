import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user_id : 0,
    email : '',
    isAuthenticated : false,
}

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        saveId : (state,action)=>{
            state.user_id = action.payload;
            state.isAuthenticated = true
            localStorage.setItem('userId',action.payload);
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

export const { saveId, saveEmail } = userInfoSlice.actions;

export default userInfoSlice.reducer;
