import { Box, Flex, Text, Button, Icon, useColorModeValue } from "@chakra-ui/react";
import { BiLogOut } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../app/Hooks/hooks";
import { logOutUser } from "../../app/Features/Auth/AuthSlice";
import { Spinner } from "../../Components";
import { useEffect, useState } from "react";
import { getUserData } from "../../app/Features/UserProfile/UsersSlice";
import { LeaderBoardStats } from "./LeaderBoardStats";

export const Profile = () => {
  const { firstName, status, attemptedQuiz, allLeaderBoards } = useAppSelector(
    (state) => state.user
  );
  const [currentLeaderBoardQuizId, setLeaderBoardQuizId] = useState<string>("");
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (status === "idle") {
      dispatch(getUserData());
    }
    setLeaderBoardQuizId(attemptedQuiz[0]?.quizId._id);
  }, [status, dispatch, setLeaderBoardQuizId, attemptedQuiz]);

  const themeBg = useColorModeValue("gray.200", "gray.600");
  const themeTextColor = useColorModeValue("gray.800", "white");
  const themeBorder = useColorModeValue("gray.600", "gray.700")

  return (
    <Flex h="100vh" w="100%" alignItems="center" justifyContent="center">
      {status === "loading" && <Spinner />}
      {status === "fulfilled" && (
        <Box
          boxShadow="lg"
          bg={themeBg}
          minH="70%"
          w={{ base: "90%", md: "70%", lg: "50%" }}
          textColor={themeTextColor}
        >
          <Flex
            w="full"
            justifyContent="space-between"
            p="2"
            h="10%"
            borderBottom="1px"
            borderColor="gray.500"
          >
            <Text
              textTransform="capitalize"
              fontWeight="600"
              fontSize="1.5rem"
            >
              Dashboard
            </Text>
            <Text
              textTransform="capitalize"
              fontWeight="600"
              fontSize="1.5rem"
            >
              Hi! {firstName}
            </Text>
            <Button
              leftIcon={<Icon as={BiLogOut} />}
              colorScheme="blue"
              onClick={() => dispatch(logOutUser())}
            >
              Log out
            </Button>
          </Flex>
          <Flex
            direction={{ base: "column", md: "row" }}
            justifyContent="space-between"
            w="full"
            minH="90%"
            h={{ base: "auto", md: "90%" }}
          >
            <Box w={{ base: "full", md: "40%" }} h="full" p="2">
              <Box
                w="90%"
                border="2px"
                borderColor={themeBorder}
                borderBottom="0"
                maxH="90%"
                overflowY="auto"
                boxShadow="2xl"
                mx="auto"
              >
                <Flex
                  w="full"
                  justifyContent="space-between"
                  p="2"
                  borderBottom="2px"
                  borderColor={themeBorder}
                >
                  <Text fontSize="xl">Quiz</Text>
                  <Text fontSize="xl">Score</Text>
                </Flex>
                {attemptedQuiz.map(({ quizId, score }) => (
                  <Flex
                    w="full"
                    justifyContent="space-between"
                    p="2"
                    borderBottom="2px"
                    borderColor={themeBorder}
                    bg={
                      currentLeaderBoardQuizId === quizId._id ? "gray.500" : {}
                    }
                    key={quizId._id}
                    onClick={() => setLeaderBoardQuizId(quizId._id)}
                  >
                    <Text fontSize="xl">{quizId.name}</Text>
                    <Text fontSize="xl">{score}</Text>
                  </Flex>
                ))}
              </Box>
            </Box>
            <Box w={{ base: "full", md: "60%" }} h="full" p="2">
              <LeaderBoardStats
                leaderBoard={allLeaderBoards[currentLeaderBoardQuizId]}
              />
            </Box>
          </Flex>
        </Box>
      )}
    </Flex>
  );
};
