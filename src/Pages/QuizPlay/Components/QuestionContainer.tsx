import {
    Flex, useColorModeValue , Stack, HStack, Text, Spacer, Grid, Box
} from "@chakra-ui/react"
import { useState } from "react";
import { useAppSelector } from "../../../app/Hooks/hooks";
import { Question, Quiz } from "../../../app/Types/Quiz.types";
import { Spinner } from "../../../Components";
import { OptionsContainer } from "./OptionsContainer";
import { SubmitQuizBtn } from "./SubmitQuizBtn";
// import { Timer } from "./Timer";

export const QuestionContainer = ({ currentQuiz } : { currentQuiz : Quiz | null }) => {

    const { questions } = { ...currentQuiz }
    const { currQuestionNumber, currScore, resultSubmittedStatus } = useAppSelector( ( state ) =>state.quiz )
    
    //Question? : Is there any work around to get the value at curr index of array which might be undefined ?
    const getQuestion = (index: number, items: Question[] | undefined ): Question | undefined =>{
        if( items ){
            return items[index];
        }
    } 
    const [ showSubmitBtn , setShowSubmitBtn ] = useState<boolean>(false);

    const currentQuestion = getQuestion( currQuestionNumber , questions ) 
    const themeBgColor = useColorModeValue('white', 'gray.700')
    const themeTextColor = useColorModeValue('gray.800', 'gray.100')

    return (
        <>
        { 
            resultSubmittedStatus === "loading" ?
            <Box>
                <Spinner />
                <Text>Submitting Quiz Wait..</Text>
            </Box>
            :
            <Flex align="center" justify="center" py={8}  >
                <Stack 
                    boxShadow={'2xl'} 
                    w="40rem"
                    minH={'65vh'} 
                    rounded={'sm'} 
                    bg={ themeBgColor }
                    p={8}
                    align={'center'}
                >
                    <HStack align="baseline" pb={2} justifyContent="space-between" w="100%">
                        <Text fontSize="lg" color="gray.500" >
                            Question: { currQuestionNumber + 1 }/ { questions?.length }
                        </Text>
                        {/* <Text fontSize="lg" color="gray.500" >
                            <Timer /> / { playTime } mins
                        </Text> */}
                        <Text fontSize="lg" color="gray.500" >
                            Score : { currScore }
                        </Text>
                    </HStack>
                    <Spacer />
                    <HStack align="baseline" pb={2} justifyContent="space-between" w="100%" >
                        <Text fontSize="lg" color={ themeTextColor } >
                            { currentQuestion?.question }                        
                        </Text>
                    </HStack>
                    <Grid templateColumns="1fr" gap={4} >
                        {
                            currentQuestion?.options?.map( option => {
                                return <OptionsContainer { ...option }  currentQuestion={currentQuestion} setShowSubmitBtn={setShowSubmitBtn}  key={ option._id } />
                            })
                        }
                    </Grid>
                    { showSubmitBtn && <SubmitQuizBtn /> }
                </Stack>
            </Flex>
        }
        </>
    );
}