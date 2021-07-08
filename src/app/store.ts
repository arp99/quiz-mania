import { configureStore } from "@reduxjs/toolkit"
import quizReducer from "./Features/Quiz/QuizSlice"

export const store = configureStore({
    reducer : {
        quiz : quizReducer,
    }
})
// Infer the rootstate and the appdispatch types from the store itself 
export type RootState =  ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 