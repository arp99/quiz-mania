import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/Hooks/hooks";
import { getLeaderBoard, loadQuizById } from "../../app/Features/Quiz/QuizSlice"
import { Spinner } from "../../Components";
import { InstructionContainer } from "./Components/InstructionContainer";
import { VStack } from "@chakra-ui/react";
import { QuestionContainer } from "./Components/QuestionContainer";

export const QuizPlay = () => {
    const [ startQuiz , setStartQuiz ] = useState<boolean>(false);
    const { currentQuiz, leaderboardFetchStatus } = useAppSelector((state)=>state.quiz)
    const { token } = useAppSelector((state) => state.auth)
    const quizDispatch = useAppDispatch()
    const { quizId } = useParams()
    useEffect(()=>{
        if(!currentQuiz && token){
            quizDispatch( loadQuizById( { quizId , token } ))
            //fetch the leaderboard
        }
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=>{
        if( token ){
            quizDispatch( getLeaderBoard( { quizId }))
        }
    },[ quizDispatch, quizId, token ])
    return (
        <VStack w={'100%'} minH="100vh">
            { !currentQuiz && leaderboardFetchStatus === "loading" && <Spinner />}
            { currentQuiz && !startQuiz && <InstructionContainer currentQuiz={currentQuiz} setStartQuiz={setStartQuiz} /> }
            { currentQuiz && startQuiz &&  <QuestionContainer currentQuiz={currentQuiz} />}
        </VStack>
    );
}