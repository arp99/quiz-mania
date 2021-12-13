import { Box, Checkbox, HStack, useColorModeValue } from "@chakra-ui/react"
import { addAnsweredOption } from "../../../app/Features/Quiz/QuizSlice"
import { useAppDispatch, useAppSelector } from "../../../app/Hooks/hooks"
import { Question } from "../../../app/Types/Quiz.types"

export const OptionsContainer = ( 
    { _id : optionId , option, isRight , currentQuestion }
    :
    { 
        _id: string; 
        option: string; 
        isRight: boolean; 
        currentQuestion: Question; 
    }) => {

        const { optionsAnswered } = useAppSelector(( state ) => state.quiz )
        const quizDispatch = useAppDispatch()

        const defaultColor = useColorModeValue('gray.200', 'gray.800')
        const answeredColor = useColorModeValue('blue.200', 'blue.800')


        const isOptionChosen = () => {
            const { _id : questionId } = currentQuestion
            return optionsAnswered[ questionId ]?.optionId === optionId
        }

        const getOptionStyle = () =>{
            const { _id : questionId } = currentQuestion
            if( optionsAnswered[ questionId ]?.optionId === optionId ){
                return answeredColor
            }
            return defaultColor
        }
        const optionChosenHandler = () => {
            const { _id : questionId, points, negativePoints = 0 } = currentQuestion
            if(isRight){
                quizDispatch( addAnsweredOption({ questionId, optionId, points }))
            }
            else{
                quizDispatch( addAnsweredOption({ questionId, optionId, points: -negativePoints }))
            }
        }

    return (
       <HStack w="100%">
           <Checkbox 
                isChecked={ isOptionChosen() } 
                onChange={ ()=>optionChosenHandler() } 
                size="md"
            />
            <Box 
                as="button" 
                bg={ getOptionStyle() } 
                h={'max-content'}
                w="100%" 
                rounded={'sm'} 
                p={{ base :"0.5rem", md:"1rem" }} 
                textAlign="left"
                fontSize={{ base : "sm", md:"lg" }}
            >
                { option }
            </Box> 
       </HStack>
    );
}