import { Box, Button, Center, Heading, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { resetCurrQuiz } from '../../app/Features/Quiz/QuizSlice';
import { useAppDispatch, useAppSelector } from '../../app/Hooks/hooks';
import { CelebrationIcon } from './components/CelebrationIcon';

export const Results = () => {
    
    const { currScore } = useAppSelector((state)=> state.quiz )
    const quizDispatch = useAppDispatch()
    const navigate = useNavigate()
    return (
        <VStack justify="center" h={'100vh'}  p={0} >
            <VStack boxShadow={'2xl'}  maxW="40vw" minH={'40vh'} justifyContent="space-between" rounded={'xl'} p={8} bg={useColorModeValue('white', 'gray.700')}  >
                <Box>
                    <Center>
                        <CelebrationIcon width="5rem" />
                    </Center>
                    <Heading>Congratulations !!</Heading>
                    <Text fontSize="lg" letterSpacing="0.15rem" align="center" >
                        You scored : { currScore } / 40
                    </Text>
                </Box>                
                <Button 
                    onClick = { 
                        ()=>{
                            quizDispatch(resetCurrQuiz())
                            navigate("/") 
                        }
                    }
                >
                Try Other Quizzes ?
                </Button>
            </VStack>
        </VStack>
    );
}