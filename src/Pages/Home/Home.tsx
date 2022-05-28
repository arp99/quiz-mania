import { useEffect } from "react";
import { Box, SimpleGrid, VStack } from "@chakra-ui/react";
import { QuizCard } from "./Components";
import { useAppDispatch, useAppSelector } from "../../app/Hooks/hooks";
import { loadAllQuizzes } from "../../app/Features/Quiz/QuizSlice";
import { ErrorAlert, Spinner } from "../../Components";

export const Home = () => {
  const { status, allQuizes } = useAppSelector((state) => state.quiz);
  const quizDispatch = useAppDispatch();

  useEffect(() => {
    if (status === "idle" && allQuizes === null) {
      quizDispatch(loadAllQuizzes());
    }
  }, [status, quizDispatch, allQuizes]);
  return (
    <VStack minH="100vh" w="full">
      <Box px={["2rem", "4rem", "5rem"]} py="4rem" minH={"100vh"} w="full">
        {status === "loading" && <Spinner />}
        {status === "error" && <ErrorAlert>Error Loading quizzes</ErrorAlert>}
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing="4.5rem" w="full">
          {allQuizes !== null &&
            allQuizes.map(({ _id, name, description, imageUrl }) => (
              <QuizCard
                key={_id}
                QuizName={name}
                description={description}
                imageUrl={imageUrl}
                quizId={_id}
              />
            ))}
        </SimpleGrid>
      </Box>
    </VStack>
  );
};
