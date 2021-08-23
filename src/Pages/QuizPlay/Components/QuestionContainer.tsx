import {
    Flex, useColorModeValue , Stack, Text, Grid, Box, VStack, HStack, Button, Spacer
} from "@chakra-ui/react"
import { nextQuestionNumber, prevQuestionNumber } from "../../../app/Features/Quiz/QuizSlice";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks/hooks";
import { Question, Quiz } from "../../../app/Types/Quiz.types";
import { Spinner } from "../../../Components";
import { OptionsContainer } from "./OptionsContainer";
import { SubmitQuizBtn } from "./SubmitQuizBtn";
import { Timer } from "./Timer";

export const QuestionContainer = ({ currentQuiz } : { currentQuiz : Quiz | null }) => {

    const { questions } = { ...currentQuiz }
    const { currQuestionNumber, resultSubmittedStatus } = useAppSelector( ( state ) =>state.quiz )
    const quizDispatch = useAppDispatch()
    
    //Question? : Is there any work around to get the value at curr index of array which might be undefined ?
    const getQuestion = (index: number, items: Question[] | undefined ): Question | undefined =>{
        if( items ){
            return items[index];
        }
    } 

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
                <Flex w="100vw" h="100vh">        
                    <VStack w="20%" bg="gray.600" px="4" >
                        <Timer />
                        {/* Current question no. out of total questions  */}
                        <Text fontSize="lg" color="gray.800" >
                            Question: { currQuestionNumber + 1 }/ { questions?.length }
                        </Text>
                        {/* A button to quit the quiz and redirect to results page  */}
                    </VStack>
                    <Flex justify="center" py={16} w="100%" h="100%">
                        <VStack w="80%">
                            <Text fontSize="lg" color={ themeTextColor } w="100%" >
                                { currentQuestion?.question }                        
                            </Text>
                            <Stack 
                                boxShadow={'2xl'} 
                                w="100%"
                                h="max-content"
                                rounded={'sm'} 
                                bg={ themeBgColor }
                                p={8}
                            >
                                <Grid templateColumns="1fr" gap={4} >
                                    {
                                        currentQuestion?.options?.map( option => {
                                            return <OptionsContainer 
                                                        { ...option }  
                                                        currentQuestion={currentQuestion} 
                                                        key={ option._id } 
                                                    />
                                        })
                                    }
                                </Grid>
                            </Stack>
                            <HStack w="100%" >
                                
                                { currQuestionNumber + 1 > 1 && 
                                    <Button 
                                        onClick={()=> quizDispatch(prevQuestionNumber())}
                                        px="8"
                                    >
                                        Previous
                                    </Button> 
                                }
                                <Spacer />
                                {/* If last question show submit quiz button  */}
                                { currQuestionNumber + 1 === questions?.length ? 
                                    <SubmitQuizBtn />
                                    : 
                                    <Button 
                                        onClick={()=> quizDispatch(nextQuestionNumber())}
                                        px="8"
                                    >
                                        Next
                                    </Button>
                                }

                            </HStack>
                        </VStack>
                    </Flex>
                </Flex>
            }
        </>
    );
}