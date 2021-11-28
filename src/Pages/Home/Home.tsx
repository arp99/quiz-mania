import { useEffect } from "react";
import { Box, SimpleGrid, VStack } from "@chakra-ui/react";
import { QuizCard } from "./Components"
import { useAppDispatch, useAppSelector } from "../../app/Hooks/hooks"
import { loadAllQuizzes } from "../../app/Features/Quiz/QuizSlice"
import { ErrorAlert, Spinner } from "../../Components"

export const Home = () => {
    const { status , allQuizes } = useAppSelector((state) => state.quiz)
    const quizDispatch = useAppDispatch()

    useEffect(()=>{
        if( status === "idle" && allQuizes ===  null ){
            quizDispatch( loadAllQuizzes() )
        }
    },[ status , quizDispatch , allQuizes])
    return (
        <VStack pt={8}>
            <Box p={8}>
                <SimpleGrid columns={{sm:1,md:2,lg:3}} spacing="2.5rem" >
                    {
                        status === "loading" &&  <Spinner />
                    }
                    {
                        status === "error" && <ErrorAlert>Error Loading quizzes</ErrorAlert>
                    }
                    {
                        allQuizes !== null && 
                        allQuizes.map(({ _id , name , description , imageUrl }) =>(
                            <QuizCard key={_id} QuizName={name} description={description} imageUrl={imageUrl} quizId={_id} />
                        ))
                    }
                </SimpleGrid>
            </Box>
        </VStack>
    );
}