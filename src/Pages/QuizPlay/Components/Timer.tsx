import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getTotalScore,
  submitResults,
} from "../../../app/Features/Quiz/QuizSlice";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks/hooks";

const RenderTime = ({ remainingTime }: { remainingTime: number }) => {
  const { token } = useAppSelector((state) => state.auth);
  const { currentQuiz, currScore } = useAppSelector((state) => state.quiz);
  const quizDispatch = useAppDispatch();
  const navigate = useNavigate();

  const submitQuiz = async () => {
    quizDispatch(getTotalScore());
    const reqArgs = {
      quizId: currentQuiz?._id,
      score: currScore,
      token,
    };
    await quizDispatch(submitResults(reqArgs));
    navigate("/results");
  };

  if (remainingTime === 0) {
    submitQuiz();
    return (
      <Box fontSize="lg" letterSpacing="0.1rem">
        Time Up...
      </Box>
    );
  }
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  return (
    <Box
      fontSize={{ base: "sm", md: "lg" }}
      letterSpacing="0.1rem"
      p={{ base: "0.5rem", md: "1rem" }}
      bg="gray.300"
    >
      <Text>
        Timer :{" "}
        <Text as="span">
          {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </Text>
      </Text>
    </Box>
  );
};

export const Timer = () => {
  const { currentQuiz } = useAppSelector((state) => state.quiz);

  const [remaining, setRemaining] = useState(
    currentQuiz ? currentQuiz.playTime * 60 : 0
  );
  useEffect(() => {
    const timer = setTimeout(() => {
      if (remaining === 0) {
        clearTimeout(timer);
      } else {
        setRemaining((prev) => prev - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [remaining]);
  return <RenderTime remainingTime={remaining} />;
};
