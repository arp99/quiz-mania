import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  getTotalScore,
  submitResults,
} from "../../../app/Features/Quiz/QuizSlice";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks/hooks";

export const SubmitQuizBtn = () => {
  const { token } = useAppSelector((state) => state.auth);
  const { currentQuiz, currScore } = useAppSelector((state) => state.quiz);
  const quizDispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log("Inside submit button: ", { currScore });
  const submitQuiz = async () => {
    const reqArgs = {
      quizId: currentQuiz?._id,
      score: currScore,
      token,
    };
    await quizDispatch(submitResults(reqArgs));
    navigate("/results");
  };

  return (
    <>
      <Button
        as="button"
        onClick={() => {
          quizDispatch(getTotalScore());
          onOpen();
        }}
      >
        Submit Quiz
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent
          m="0"
          w={{ base: "90%", md: "40%" }}
          h="56"
          justifyContent="space-between"
        >
          <ModalHeader textAlign="center">Are you sure?</ModalHeader>
          <ModalFooter justifyContent="center">
            <Box>
              <Button colorScheme="red" onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="teal" onClick={submitQuiz} ml="4">
                Yes Submit
              </Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
