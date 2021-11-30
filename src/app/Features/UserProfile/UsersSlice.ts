import { createSlice , createAsyncThunk } from "@reduxjs/toolkit"
import { UserProfileInitialState } from "../../Types/User.types"
import { fetchUserData } from "./services/fetchUserData"

export const getUserData  = createAsyncThunk("UserProfile/getUserData" , async ( ) => {
    const response = await fetchUserData()
    console.log("From userSlice async thunk: " , { response })
    return response.data;
})

const initialState : UserProfileInitialState = {
    firstName : "",
    lastName : "",
    email : "",
    attemptedQuiz : [],
    allLeaderBoards : {},
    status : "idle"
}

export const UserSlice = createSlice({
    name : "UserProfile",
    initialState,
    reducers : {
        resetUserState : ( state ) => {
            state.status = "idle"
        }
    },
    extraReducers : ( builder ) =>{
        builder.addCase(getUserData.pending , (state) => {
            state.status = "loading"
        });
        builder.addCase(getUserData.fulfilled , ( state, action ) =>{
            const { firstName , lastName , email, attemptedQuiz } = action.payload.userData;
            state.firstName = firstName;
            state.lastName = lastName;
            state.email = email;
            state.attemptedQuiz = attemptedQuiz;
            state.allLeaderBoards = action.payload.allLeaderBoard;
            state.status = "fulfilled"
        });
        builder.addCase(getUserData.rejected , ( state ) => {
            state.status = "error"
        })
    }
})
export const { resetUserState } = UserSlice.actions
export default UserSlice.reducer;
