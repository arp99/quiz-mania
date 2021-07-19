import { createSlice , PayloadAction , createAsyncThunk } from "@reduxjs/toolkit"
import { QuizInitialState } from "../../Types/Quiz.types"
import { fetchAllQuizzes, fetchQuizById } from "./services/fetchQuizzes"

export const loadAllQuizzes = createAsyncThunk("quizData/loadAllQuizzes" , async () => {
    const response = await fetchAllQuizzes()
    console.log("log from async thunk of all quizzes: ", {response})
    return response.data.quizData
})

export const loadQuizById = createAsyncThunk("quizData/loadQuizById" , async ( reqArgs: { quizId : string , token : string | null } ) => {
    const { quizId , token } = reqArgs;
    const response = await fetchQuizById( quizId , token )
    console.log("Log from async thunk of quiz by id: " , { response })
    return response.data
})



//create type for slice state which will be same as type of QuizData
const initialState : QuizInitialState = {
    allQuizes : null,
    currentQuiz : null,
    currQuestionNumber: 0,
    optionClickDisabled: false,
    currScore : 0,
    status : "idle",
    currQuizLoadStatus : "idle",
    error : null //Question?: How to get built in type of error 
}

export const QuizSlice = createSlice({
    name : "quizData",
    initialState,
    reducers : {
        updateScore : ( state , action : PayloadAction<number> ) =>{ //Payload will be points: may be negative or positive
            state.currScore += action.payload
        },
        updateQuestionNumber : (state) => {
            state.currQuestionNumber += 1
        },
        resetStatus : ( state ) => {
            state.status = "idle"
            state.currQuizLoadStatus = "idle"
        },
        disableOptionClick : ( state ) => {
            state.optionClickDisabled = true;
        },
        enableOptionClick : ( state ) => {
            state.optionClickDisabled = false;
        }
    },
    extraReducers : (builder) => {
        builder.addCase(loadAllQuizzes.pending, (state) => {
            state.status = "loading";
            state.error =  null;
        });
        builder.addCase(loadAllQuizzes.fulfilled , ( state , action ) => {
            console.log("In action fulfilled" , action.payload)
            state.allQuizes = action.payload
            state.status = "fulfilled"
        });
        builder.addCase(loadAllQuizzes.rejected, ( state , action ) => {
            state.status = "error"
            state.error = action.error.message
        });

        builder.addCase(loadQuizById.pending , (state) => {
            state.currQuizLoadStatus = "loading"
            state.error = null
        });
        builder.addCase(loadQuizById.fulfilled , ( state , action ) => {
            console.log("In action fulfilled of quiz by id: " , action.payload )
            state.currentQuiz = action.payload.quizData[0]
            state.currQuizLoadStatus = "fulfilled"
        });
        builder.addCase(loadQuizById.rejected , ( state, action ) => {
            state.currQuizLoadStatus = "error"
            state.error = action.error.message
        })

    }
})

export const { 
        
    updateScore , 
    updateQuestionNumber , 
    resetStatus, 
    disableOptionClick, 
    enableOptionClick

} = QuizSlice.actions
export default QuizSlice.reducer