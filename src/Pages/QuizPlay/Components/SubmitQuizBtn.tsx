import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getTotalScore, submitResults } from '../../../app/Features/Quiz/QuizSlice';
import { useAppDispatch, useAppSelector } from '../../../app/Hooks/hooks';

export const SubmitQuizBtn = () => {
   
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
    return (
        <Button as="button" onClick={()=>submitQuiz()}>Submit Quiz</Button>
    );
}