import axios from "axios"

export const fetchAllQuizzes = () => {
    return axios.get('https://quiz-mania-backend.arp99.repl.co/api/quizes')
}

export const fetchQuizById = ( quizId : string , token : string | null ) => {
    
    return axios.get(`https://quiz-mania-backend.arp99.repl.co/api/quizes/${quizId}`,{
        headers : {
            authorization : `Bearer ${token}`
        }
    })
}

export const submitQuizResults = ( quizId : string | undefined , score : number , token : string | null ) => {
    
    return axios.post(`https://quiz-mania-backend.arp99.repl.co/api/user/results`,{        
            quizId,
            score
        },
        {
            headers : {
                authorization : `Bearer ${token}`
            }
        }
    )
}