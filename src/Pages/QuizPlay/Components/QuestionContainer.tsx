import {
  Flex,
  useColorModeValue,
  Stack,
  Text,
  Grid,
  Box,
  VStack,
  HStack,
  Button,
  Spacer,
} from "@chakra-ui/react";
import {
  nextQuestionNumber,
  prevQuestionNumber,
} from "../../../app/Features/Quiz/QuizSlice";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks/hooks";
import { Question, Quiz } from "../../../app/Types/Quiz.types";
import { Spinner } from "../../../Components";
import { OptionsContainer } from "./OptionsContainer";
import { SubmitQuizBtn } from "./SubmitQuizBtn";
import { Timer } from "./Timer";

export const QuestionContainer = ({
  currentQuiz,
}: {
  currentQuiz: Quiz | null;
}) => {
  const { questions } = { ...currentQuiz };
  const { currQuestionNumber, resultSubmittedStatus } = useAppSelector(
    (state) => state.quiz
  );
  const quizDispatch = useAppDispatch();

  const getQuestion = (
    index: number,
    items: Question[] | undefined
  ): Question | undefined => {
    if (items) {
      return items[index];
    }
  };

  const currentQuestion = getQuestion(currQuestionNumber, questions);
  const themeBgColor = useColorModeValue("white", "gray.700");
  const themeTextColor = useColorModeValue("gray.800", "gray.100");

  return (
    <>
      {resultSubmittedStatus === "loading" ? (
        <Box>
          <Spinner />
          <Text>Submitting Quiz Wait..</Text>
        </Box>
      ) : (
        <Flex
          w="100vw"
          minH="100vh"
          justifyContent="center"
          alignItems="center"
          py={{ base: "4.5rem", md: "1rem" }}
        >
          <VStack
            w={{ base: "95%", md: "75%", lg: "60%" }}
            mt={{ base: "0rem", md: "2rem" }}
          >
            <HStack w="100%" justifyContent="space-between">
              <Text
                fontSize={{ base: "sm", md: "lg" }}
                color={themeTextColor}
                bg="gray.300"
                p={{ base: "0.5rem", md: "1rem" }}
              >
                Question: {currQuestionNumber + 1}/ {questions?.length}
              </Text>
              <Timer />
            </HStack>
            <Text fontSize="lg" color={themeTextColor} w="100%">
              {currentQuestion?.question}
            </Text>
            <Stack
              boxShadow={"2xl"}
              w="100%"
              h="max-content"
              rounded={"sm"}
              bg={themeBgColor}
              p={{ base: "1rem", md: "2rem" }}
            >
              <Grid templateColumns="1fr" gap="0.5rem">
                {currentQuestion?.options?.map((option) => {
                  return (
                    <OptionsContainer
                      {...option}
                      currentQuestion={currentQuestion}
                      key={option._id}
                    />
                  );
                })}
              </Grid>
            </Stack>
            <HStack w="100%">
              {currQuestionNumber + 1 > 1 && (
                <Button
                  onClick={() => quizDispatch(prevQuestionNumber())}
                  px={{ base: "0.5rem", md: "1rem" }}
                  fontSize={{ base: "sm", md: "lg" }}
                >
                  Previous
                </Button>
              )}
              <Spacer />
              {/* If last question show submit quiz button  */}
              {currQuestionNumber + 1 === questions?.length ? (
                <SubmitQuizBtn />
              ) : (
                <Button
                  onClick={() => quizDispatch(nextQuestionNumber())}
                  px={{ base: "0.5rem", md: "1rem" }}
                  fontSize={{ base: "sm", md: "lg" }}
                >
                  Next
                </Button>
              )}
            </HStack>
          </VStack>
        </Flex>
      )}
    </>
  );
};
