export type leaderboard = Array<{
    firstName : string,
    lastName : string | undefined,
    quizName : string,
    score : number
}>

type allLeaderBaords  = {
    [ quizId : string ] : leaderboard
}

export type UserProfileInitialState  = {
    firstName : string;
    lastName : string;
    email : string;
    attemptedQuiz : Array<any>;
    allLeaderBoards : allLeaderBaords;
    status : "idle" | "fulfilled" | "loading" | "error";
}