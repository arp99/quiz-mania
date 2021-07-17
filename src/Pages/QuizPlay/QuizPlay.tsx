import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/Hooks/hooks";
import { loadQuizById } from "../../app/Features/Quiz/QuizSlice"
import { Spinner } from "../../Components";
import { InstructionContainer } from "./Components/InstructionContainer";
import { VStack } from "@chakra-ui/react";

export const QuizPlay = () => {
    const { currentQuiz } = useAppSelector((state)=>state.quiz)
    const { token } = useAppSelector((state) => state.auth)
    const quizDispatch = useAppDispatch()
    const { quizId } = useParams()
    useEffect(()=>{
        if(!currentQuiz && token){
            quizDispatch( loadQuizById( { quizId , token } ))
        }
    },[])

    return (
        <VStack w={'100%'}>
            { !currentQuiz && <Spinner />}
            { currentQuiz && <InstructionContainer currentQuiz={currentQuiz} /> }
        </VStack>
    );
}