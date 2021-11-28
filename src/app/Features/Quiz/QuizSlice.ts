import { createSlice , PayloadAction , createAsyncThunk } from "@reduxjs/toolkit"
import { QuizInitialState } from "../../Types/Quiz.types"
import { fetchLeaderBoard } from "./services/fetchLeaderBoard"
import { fetchAllQuizzes, fetchQuizById, submitQuizResults } from "./services/fetchQuizzes"

export const loadAllQuizzes = createAsyncThunk("quizData/loadAllQuizzes" , async () => {
    const response = await fetchAllQuizzes()
    console.log("log from async thunk of all quizzes: ", {response})
    return response.data.quizData
})

export const loadQuizById = createAsyncThunk("quizData/loadQuizById" , async ( reqArgs: { quizId : string , token : string | null } ) => {
    const { quizId } = reqArgs;
    const response = await fetchQuizById( quizId )
    console.log("Log from async thunk of quiz by id: " , { response })
    return response.data
})

export const submitResults = createAsyncThunk("quizData/submitResults" , async ( 
    reqArgs : { 
        quizId : string | undefined,
        score : number, 
        token : string | null 
    },
    { rejectWithValue }) => {
        
        try{
            const { quizId , score} = reqArgs;
            const response = await submitQuizResults( quizId , score )
            return response.data;    
        }catch(err:any){
            return rejectWithValue(err?.response.data)
        }
    })

export const getLeaderBoard = createAsyncThunk("quizData/leaderboard", async ( reqArgs : { quizId : string }) => {
    const { quizId } = reqArgs
    const response = await fetchLeaderBoard( quizId )
    console.log("Insude async thunk of getLeaderBoard: ", { response })
    return response.data
})

//create type for slice state which will be same as type of QuizData
const initialState : QuizInitialState = {
    allQuizes : null,
    currentQuiz : null,
    currQuestionNumber: 0,
    optionsAnswered : {},
    currScore : 0,
    leaderboard : null,
    status : "idle",
    resultSubmittedStatus : "idle",
    currQuizLoadStatus : "idle",
    leaderboardFetchStatus : "idle",
    error : null //Question?: How to get built in type of error 
}

export const QuizSlice = createSlice({
    name : "quizData",
    initialState,
    reducers : {
        getTotalScore : ( state ) => {
            let total = 0;
            Object.values( state.optionsAnswered ).forEach( answer => {
                total += answer.points
            })
            state.currScore = total
        },
        nextQuestionNumber : (state) => {
            state.currQuestionNumber += 1
        },
        prevQuestionNumber : (state) => {
            state.currQuestionNumber -= 1
        },
        addAnsweredOption : ( state , action : PayloadAction<{ questionId : string, optionId : string, points : number}> ) =>{
            const { questionId, optionId, points } = action.payload
            state.optionsAnswered[ questionId ] = { optionId , points }
        },
        resetCurrQuiz : (state) => {
            state.currQuestionNumber = 0
            state.currScore = 0
            state.resultSubmittedStatus = "idle"
            state.optionsAnswered = {}
        },
        resetStatus : ( state ) => {
            state.status = "idle"
            state.currQuizLoadStatus = "idle"
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
        });
        builder.addCase(submitResults.pending , (state) => {
            state.resultSubmittedStatus = "loading"
        });
        builder.addCase(submitResults.fulfilled , ( state , action ) => {
            console.log(" from extra reducer in submitResults: ", action.payload )
            state.resultSubmittedStatus = "fulfilled"
        });
        builder.addCase(submitResults.rejected , ( state, action ) => {
            console.log("Error payload in submit results:", action.payload )
            state.resultSubmittedStatus = "error"
        });
        builder.addCase(getLeaderBoard.pending, ( state ) => {
            state.leaderboardFetchStatus = "loading"
        });
        builder.addCase(getLeaderBoard.fulfilled, ( state, action ) => {
            console.log("Inside extra reducer of getLeaderBoard: ", action.payload )
            state.leaderboard = action.payload.leaderBoard
            state.leaderboardFetchStatus = "fulfilled"
        });
        builder.addCase(getLeaderBoard.rejected , ( state ) => {
            state.leaderboardFetchStatus = "error"
        })

    }
})

export const { 
        
    getTotalScore, 
    nextQuestionNumber,
    prevQuestionNumber,
    resetCurrQuiz,
    addAnsweredOption, 
    resetStatus, 
} = QuizSlice.actions
export default QuizSlice.reducer