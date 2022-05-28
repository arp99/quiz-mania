import { axiosAuthorization }  from "../../Auth/services/axiosInstance"

export const fetchLeaderBoard = ( quizId : string | undefined ) => {
    return axiosAuthorization.get("api/user/leaderboard", {
        params : {
            quizId
        }
    })
}