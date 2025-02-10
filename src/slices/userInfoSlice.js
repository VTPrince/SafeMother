import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user_id : 0,
    email : '',
}

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        saveId : (state,action)=>{
            state.user_id = action.payload
        },
        saveEmail : (state,action)=>{
            state.email = action.payload
        },
    },
})

export const { saveId, saveEmail } = userInfoSlice.actions;

export default userInfoSlice.reducer;
