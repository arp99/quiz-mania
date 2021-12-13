import {
  Button,
  Center,
  Heading,
  Text,
  useColorModeValue,
  Flex,
  Box,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { Quiz } from "../../../app/Types/Quiz.types";
import { Leaderboard } from "./Leaderboard";

export const InstructionContainer = ({
  currentQuiz,
  setStartQuiz,
}: {
  currentQuiz: Quiz | null;
  setStartQuiz: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { name, questions } = { ...currentQuiz };
  return (
    <Box w="full" h="100%" p={0} pb={{ base:"20", md:"0"}}>
      <Box
        boxShadow={"2xl"}
        w={{ base: "90%", md: "85%", lg:"60%" }}
        minH="60vh"
        rounded={"xl"}
        p={8}
        mx="auto"
        mt="20"
        bg={useColorModeValue("white", "gray.700")}
      >
        <Heading>{name}</Heading>
        <Flex minH="60vh" w="100%" direction={{ base:"column", md:"row"}}>
          <Box h="inherit" w={{ base:"100%", md:"50%" }} border="2px" borderColor="gray.500" mb="2" p="2">
            <Text mb="2" fontSize="lg" letterSpacing="0.15rem">
              Total Questions: {questions?.length}
            </Text>
            <Text mb="2" fontSize="lg" letterSpacing="0.15rem">
              Duration: 5 minutes
            </Text>
            <Text mb="2" fontSize="lg" letterSpacing="0.15rem">
              Rules:
            </Text>

            <UnorderedList pl="4">
              <ListItem>
                <Text mb="2" fontSize="lg" letterSpacing="0.15rem">
                  Submit Quiz before the time
                </Text>
              </ListItem>
              <ListItem>
                <Text mb="2" fontSize="lg" letterSpacing="0.15rem">
                  4 marks for Right Answer
                </Text>
              </ListItem>
              <ListItem>
                <Text mb="2" fontSize="lg" letterSpacing="0.15rem">
                  -1 for every wrong answer
                </Text>
              </ListItem>
              <ListItem>
                <Text mb="2" fontSize="lg" letterSpacing="0.15rem">
                  Good luck see you on leaderboard
                </Text>
              </ListItem>
            </UnorderedList>
            <Center>
              <Button
                bg={"blue.500"}
                rounded={"lg"}
                color={"white"}
                letterSpacing="0.15rem"
                w="max"
                onClick={() => setStartQuiz(true)}
              >
                Start Quiz
              </Button>
            </Center>
          </Box>
          <Box w={{ base:"100%", md:"50%" }}>
              <Leaderboard />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
