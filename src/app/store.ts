import { configureStore } from "@reduxjs/toolkit"
import quizReducer from "./Features/Quiz/QuizSlice"
import authReducer from "./Features/Auth/AuthSlice"
import userReducer from "./Features/UserProfile/UsersSlice"

export const store = configureStore({
    reducer : {
        quiz : quizReducer,
        auth : authReducer,
        user : userReducer
    }
})
// Infer the rootstate and the appdispatch types from the store itself 
export type RootState =  ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 