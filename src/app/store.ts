import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
    reducer : {
    }
})
// Infer the rootstate and the appdispatch types from the store itself 
export type RootState =  ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 