import { Box , Image, Heading, Text, Button ,VStack} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks/hooks";
import { loadQuizById } from "../../../app/Features/Quiz/QuizSlice"
import { useToast } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";

export const QuizCard = ({ 
        QuizName , 
        description , 
        imageUrl,
        quizId
    } 
    : { 
        QuizName : string , 
        description : string , 
        imageUrl : string,
        quizId : string 
    }) => {
    const { authStatus, token } = useAppSelector((state) =>state.auth)
    const toast = useToast()
    const { currentQuiz, currQuizLoadStatus } = useAppSelector((state)=>state.quiz)
    const quizDispatch = useAppDispatch()
    const navigate = useNavigate()

    const QuizPlayButtonClicked = async() => {
        
        if( authStatus !== "fulfilled"){
            return toast({
                title: "Login First to Enter Quiz",
                status: "warning",
                duration: 2000,
                isClosable: true,
                position:"top"
              })
            }
            else{
                if( !currentQuiz ){
                    await quizDispatch( loadQuizById( { quizId , token } ))
                    navigate(`/quiz/${quizId}`)
                }else{
                    navigate(`/quiz/${quizId}`)
                }
        }
    }
    
    return (
        <Box w="full" borderRadius="lg" overflow="hidden" borderWidth="2px">
            <Image src={imageUrl} alt="Quiz Image" aria-label="Quiz image" w="100%" h={{ base:"10rem", md:"12rem" }} />
            <VStack p={4} align="flex-start">
                <Box>
                    <Heading fontSize={{ base:"2rem", md:"2.5rem", lg:"3rem" }}>{QuizName}</Heading>
                    <Text>{description}</Text>
                </Box>
                <Button 
                    colorScheme="teal" 
                    isLoading={ currQuizLoadStatus === "loading" }
                    loadingText={ "Loading Questions" }
                    px="2rem" 
                    size="lg" 
                    onClick={ ()=> QuizPlayButtonClicked() }
                >
                    Play
                </Button>
            </VStack>
        </Box>
    );
}

