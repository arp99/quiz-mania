import axios, { axiosAuthorization } from "../../Auth/services/axiosInstance"

export const fetchAllQuizzes = () => {
    return axios.get('api/quizes')
}

export const fetchQuizById = ( quizId : string ) => {
    
    return axiosAuthorization.get(`api/quizes/${quizId}`)
}

export const submitQuizResults = ( quizId : string | undefined , score : number ) => {
    
    return axiosAuthorization.post(`api/user/results`,{        
            quizId,
            score
        }
    )
}