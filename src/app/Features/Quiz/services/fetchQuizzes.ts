import axios, { AxiosResponse } from "axios"
import { AllQuizes , Quiz} from "../../../Types/Quiz.types"

/**TODO: Narrow down type checking on the axios response which was not working as expected...Need Help! */

export const fetchAllQuizzes = () => {
    return axios.get('https://quiz-mania-backend.arp99.repl.co/api/quizes')
}

export const fetchQuizById = ( quizId : string , token : string ) => {
    
    return axios.get(`https://quiz-mania-backend.arp99.repl.co/api/quizes/${quizId}`,{
        headers : {
            authorization : `Bearer ${token}`
        }
    })
}