import { configureStore } from "@reduxjs/toolkit";
import userInfoSliceReducer from "./slices/userInfoSlice";


export const store = configureStore({
    reducer: {
        userInfo: userInfoSliceReducer,
    },
})