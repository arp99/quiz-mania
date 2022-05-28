import { Box, UnorderedList, Flex, Text, Image } from "@chakra-ui/react";
import bronze from "../../Results/assets/bronze-medal.png";
import silver from "../../Results/assets/silver-medal.png";
import gold from "../../Results/assets/gold-medal.png";

import { useAppSelector } from "../../../app/Hooks/hooks";

export const Leaderboard = () => {
  const { leaderboard, leaderboardFetchStatus } = useAppSelector(
    (state) => state.quiz
  );
  return leaderboardFetchStatus === "fulfilled" ? (
    <Box w="full" h="full">
      <UnorderedList
        rounded="md"
        border="2px"
        borderColor="gray.500"
        w="80%"
        mx="auto"
        h="auto"
      >
        <Flex
          as="li"
          justifyContent="space-between"
          borderBottom="1px"
          borderColor="gray.500"
          p="2"
        >
          <Box>
            <Text>Rank</Text>
          </Box>
          <Box>
            <Text>Player</Text>
          </Box>
          <Box>
            <Text>Score</Text>
          </Box>
        </Flex>
        {leaderboard?.map(({ firstName, lastName, quizName, score }, index) => {
          return (
            <Flex
              as="li"
              justifyContent="space-between"
              borderBottom="1px"
              borderColor="gray.500"
              p="2"
              key={index + firstName}
            >
              <Box>
                <Text>
                  {index === 0 && <Image src={gold} boxSize="25px" />}
                  {index === 1 && <Image src={silver} boxSize="25px" />}
                  {index === 2 && <Image src={bronze} boxSize="25px" />}
                  {index > 2 && index + 1}
                </Text>
              </Box>
              <Box>
                <Text>
                  {firstName.toLocaleUpperCase()}{" "}
                  {lastName !== undefined && lastName.toLocaleUpperCase()}
                </Text>
              </Box>
              <Box>
                <Text>{score}</Text>
              </Box>
            </Flex>
          );
        })}
      </UnorderedList>
    </Box>
  ) : (
    <></>
  );
};
