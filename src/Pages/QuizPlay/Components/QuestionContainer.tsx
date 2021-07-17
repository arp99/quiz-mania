import {
    Flex, useColorModeValue , Stack, HStack, Text, Spacer, Grid
} from "@chakra-ui/react"
import { useAppSelector } from "../../../app/Hooks/hooks";
import { Question, Quiz } from "../../../app/Types/Quiz.types";
import { OptionsContainer } from "./OptionsContainer";

export const QuestionContainer = ({ currentQuiz } : { currentQuiz : Quiz | null }) => {

    const { playTime, questions } = { ...currentQuiz }
    const { currQuestionNumber, currScore } = useAppSelector( ( state ) =>state.quiz )
    
    //Question? : Is there any work around to get the value at curr index of array which might be undefined ?
    const getQuestion = (index: number, items: Question[] | undefined ): Question | undefined =>{
        if( items ){
            return items[index];
        }
    } 

    const currentQuestion = getQuestion( currQuestionNumber , questions ) 

    return (
        <Flex align="center" justify="center" py={8}  >
            <Stack 
                boxShadow={'2xl'} 
                w="40rem"
                minH={'65vh'} 
                rounded={'sm'} 
                bg={useColorModeValue('white', 'gray.700')}
                p={8}
                align={'center'}
            >
                <HStack align="baseline" pb={2} justifyContent="space-between" w="100%">
                    <Text fontSize="lg" color="gray.500" >
                        Question: { currQuestionNumber + 1 }/ { questions?.length }
                    </Text>
                    <Text fontSize="lg" color="gray.500" >
                        { playTime } mins
                    </Text>
                    <Text fontSize="lg" color="gray.500" >
                        Score : { currScore }
                    </Text>
                </HStack>
                <Spacer />
                <HStack align="baseline" pb={2} justifyContent="space-between" w="100%" >
                    <Text fontSize="lg" color={useColorModeValue('gray.800', 'gray.100')} >
                        { currentQuestion?.question }                        
                    </Text>
                </HStack>
                <Grid templateColumns="1fr" gap={4} >
                    {
                        currentQuestion?.options?.map( option => {
                            return <OptionsContainer { ...option } key={ option._id } />
                        })
                    }
                </Grid>
            </Stack>
        </Flex>
    );
}