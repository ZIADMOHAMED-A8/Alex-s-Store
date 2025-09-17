import { configureStore } from "@reduxjs/toolkit";
import { dataApi } from "./dataslice";

export const Store=configureStore({
    reducer:{
        [dataApi.reducerPath]:dataApi.reducer
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(dataApi.middleware),
})