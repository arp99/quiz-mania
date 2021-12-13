import { Box, Button, Center, Heading, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';
import { resetCurrQuiz } from '../../app/Features/Quiz/QuizSlice';
import { useAppDispatch, useAppSelector } from '../../app/Hooks/hooks';
import { CelebrationIcon } from './components/CelebrationIcon';

export const Results = () => {
    
    const { currScore } = useAppSelector((state)=> state.quiz )
    const quizDispatch = useAppDispatch()
    const navigate = useNavigate()
    const confettiRef = useRef<HTMLDivElement>(null)
    const [ height, setHeight ] = useState<number>(0)
    const [ width, setWidth ] = useState<number>(0)

    useEffect(()=>{
        setHeight(confettiRef?.current?.clientHeight ?? 0)
        setWidth(confettiRef?.current?.clientWidth ?? 0)
    },[])

    return (
        <>
            <Confetti 
                width={width}
                height={height}
                numberOfPieces={80}
                gravity={0.15}
            />
            <VStack justify="center" h={'100vh'}  p={0} ref={confettiRef}>
                <VStack boxShadow={'2xl'} w={{ base :"80%", md:"50%", lg:"40%" }} minH={'40vh'} justifyContent="space-between" rounded={'xl'} p={8} bg={useColorModeValue('white', 'gray.700')}  >
                    <Box>
                        <Center>
                            <CelebrationIcon width="5rem" />
                        </Center>
                        <Heading fontSize={{ base :"2xl", md:"3xl" }}>Congratulations !!</Heading>
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
        </>
    );
}