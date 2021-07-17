type Option = {
    _id : string;
    option : string;
    isRight : boolean;
}

type Question  = {
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

export type QuizInitialState  = {
    allQuizes : AllQuizes | null;
    currentQuiz : Quiz | null;
    currQuestionNumber : number;
    currScore : number;
    status : "idle" | "loading" | "fulfilled" | "error";
    error : string | null | undefined;
    currQuizLoadStatus : "idle" | "loading" | "fulfilled" | "error";
}