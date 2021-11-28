import { axiosAuthorization }  from "../../Auth/services/axiosInstance"

export const fetchLeaderBoard = ( quizId : string | undefined ) => {
    console.log("quizId in fetchLeaderBoard service: ",{ quizId })
    return axiosAuthorization.get("api/user/leaderboard", {
        params : {
            quizId
        }
    })
}