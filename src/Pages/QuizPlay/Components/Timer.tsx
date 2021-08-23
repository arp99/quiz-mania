import { Box } from "@chakra-ui/react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useNavigate } from "react-router-dom";
import { getTotalScore, submitResults } from "../../../app/Features/Quiz/QuizSlice";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks/hooks";

const RenderTime = ({ remainingTime }:{ remainingTime : number }) => {
    
  const { token } = useAppSelector(( state ) => state.auth )
    const { currentQuiz, currScore } = useAppSelector(( state ) => state.quiz )
    const quizDispatch = useAppDispatch()
    const navigate = useNavigate()
    
    const submitQuiz = async () => {
        quizDispatch( getTotalScore())
        const reqArgs = {
                quizId : currentQuiz?._id,
                score : currScore,
                token
        }
        await quizDispatch( submitResults( reqArgs ))
        navigate("/results") 
    }
  
    if (remainingTime === 0) {
      submitQuiz()    
      return <Box fontSize="lg" letterSpacing="0.1rem">Time Up...</Box>;
    }
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    return (
      <Box fontSize="lg" letterSpacing="0.1rem">
          {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
      </Box>
    );
}


export const Timer = () => {

    const { currentQuiz } = useAppSelector((state)=>state.quiz)
    return (
        <CountdownCircleTimer
            isPlaying
            duration={ currentQuiz? currentQuiz.playTime * 60 : 0 }
            colors="#1a202c"
            rotation="counterclockwise"
            size={120}
            strokeWidth={6}
        >
          { RenderTime }
        </CountdownCircleTimer>
    );
};
