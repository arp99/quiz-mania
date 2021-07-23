import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/Hooks/hooks";
import { loadQuizById } from "../../app/Features/Quiz/QuizSlice"
import { Spinner } from "../../Components";
import { InstructionContainer } from "./Components/InstructionContainer";
import { VStack } from "@chakra-ui/react";
import { QuestionContainer } from "./Components/QuestionContainer";

export const QuizPlay = () => {
    const [ startQuiz , setStartQuiz ] = useState<boolean>(false);
    const { currentQuiz } = useAppSelector((state)=>state.quiz)
    const { token } = useAppSelector((state) => state.auth)
    const quizDispatch = useAppDispatch()
    const { quizId } = useParams()
    useEffect(()=>{
        if(!currentQuiz && token){
            quizDispatch( loadQuizById( { quizId , token } ))
        }
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <VStack w={'100%'}>
            { !currentQuiz && <Spinner />}
            { currentQuiz && !startQuiz && <InstructionContainer currentQuiz={currentQuiz} setStartQuiz={setStartQuiz} /> }
            { currentQuiz && startQuiz &&  <QuestionContainer currentQuiz={currentQuiz} />}
        </VStack>
    );
}