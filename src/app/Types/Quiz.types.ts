type Option = {
    _id : string;
    option : string;
    isRight : boolean;
}

export type Question  = {
    _id : string;
    question : string;
    points : number;
    negativePoints? : number;
    options : Array<Option>
}

export type Quiz  = {
    _id : string;
    name : string;
    description : string;
    imageUrl : string;
    playTime : number;
    totalPoints : number;
    questions : Array<Question>
}
export type AllQuizes = Array<{
    _id : string;
    name : string;
    description : string;
    imageUrl : string;
}>

type OptionsAnswered = {
    [ key : string ] : { optionId : string; points : number }
}

type UserInfo = {
    firstName : string,
    lastName : string | undefined,
    quizName : string,
    score : number
}

export type loadedQuiz = {
    [ _id : string ] : Quiz
}

export type QuizInitialState  = {
    allQuizes : AllQuizes | null;
    currentQuiz : Quiz | null;
    loadedQuizes : loadedQuiz;
    currQuestionNumber : number;
    optionsAnswered : OptionsAnswered; 
    currScore : number;
    status : "idle" | "loading" | "fulfilled" | "error";
    leaderboard : [] | Array<UserInfo> | null;
    resultSubmittedStatus : "idle" | "loading" | "fulfilled" | "error";
    error : string | null | undefined;
    currQuizLoadStatus : "idle" | "loading" | "fulfilled" | "error";
    leaderboardFetchStatus : "idle" | "loading" | "fulfilled" | "error";
}