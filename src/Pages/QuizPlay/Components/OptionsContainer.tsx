import { Box, useColorModeValue } from "@chakra-ui/react"
import { useState } from "react"
import { 
    disableOptionClick, 
    enableOptionClick, 
    updateScore, 
    updateQuestionNumber,
} from "../../../app/Features/Quiz/QuizSlice"
import { useAppDispatch, useAppSelector } from "../../../app/Hooks/hooks"
import { Question } from "../../../app/Types/Quiz.types"

export const OptionsContainer = ( 
    { _id , option, isRight , currentQuestion, setShowSubmitBtn } 
    :
    { 
        _id: string; 
        option: string; 
        isRight: boolean; 
        currentQuestion: Question; 
        setShowSubmitBtn: React.Dispatch<React.SetStateAction<boolean>> 
    }) => {

        const [ selectedId , setSelectedId ] = useState<string>('')
        const { optionClickDisabled, currentQuiz, currQuestionNumber } = useAppSelector(( state ) => state.quiz )
        const quizDispatch = useAppDispatch()

        const rightAnswer = useColorModeValue('green.200','green.500')
        const wrongAnswer = useColorModeValue('red.200', 'red.500')
        const defaultColor = useColorModeValue('gray.200', 'gray.800')

        const showNextQuestion = () => {
            currQuestionNumber + 1 === currentQuiz?.questions.length ? setShowSubmitBtn(true) : quizDispatch( updateQuestionNumber() )
        }

        const checkAnswerAndShowNextQuestion = () =>{
            if( !isRight ){
                const { negativePoints } = currentQuestion
                quizDispatch( updateScore( negativePoints ? -1 * negativePoints : 0 ))
            }
            else if( isRight ){
                const { points } = currentQuestion
                quizDispatch( updateScore(points) )
            }
            showNextQuestion()
        }

        const getOptionStyle = () =>{
            if( optionClickDisabled ){
                if(isRight){
                    return rightAnswer;
                }
                else if( _id === selectedId ){
                    return wrongAnswer;
                }
            }
            return defaultColor;    
        }
        const optionChosenHandler = () => {
            quizDispatch( disableOptionClick() )
            setSelectedId(_id)
            setTimeout(()=>{
                checkAnswerAndShowNextQuestion()
                quizDispatch( enableOptionClick() )
            },1000)
        }
    return (
       <Box 
            as="button" 
            disabled={ optionClickDisabled }
            onClick={ ()=>optionChosenHandler() }
            bg={ getOptionStyle() } 
            h={'max-content'} 
            rounded={'sm'} 
            p={4} 
            textAlign="left"
        >
           { option }
       </Box> 
    );
}