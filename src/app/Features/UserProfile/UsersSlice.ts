import { createSlice , createAsyncThunk } from "@reduxjs/toolkit"
import { fetchUserData } from "./services/fetchUserData"

export const getUserData  = createAsyncThunk("UserProfile/getUserData" , async (token : string | null, { rejectWithValue } ) => {
    try{
        const response = await fetchUserData(token)
        console.log("From userSlice async thunk: " , { response })
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data)
    }
})

type UserProfileState  = {
    firstName : string;
    lastName : string;
    email : string;
    attemptedQuiz : Array<any>;
    status : "idle" | "fulfilled" | "loading" | "error";
}

const initialState : UserProfileState = {
    firstName : "",
    lastName : "",
    email : "",
    attemptedQuiz : [],
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
            console.log(action.payload)
            state.firstName = firstName;
            state.lastName = lastName;
            state.email = email;
            state.attemptedQuiz = attemptedQuiz;
            state.status = "fulfilled"
        });
        builder.addCase(getUserData.rejected , ( state, action ) => {
            console.log("From extra reducers in User profile: ", action.payload)
            state.status = "error"
        })
    }
})
export const { resetUserState } = UserSlice.actions
export default UserSlice.reducer;
