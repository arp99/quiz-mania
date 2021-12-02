import { Flex, Box, Text, useColorModeValue, Image } from "@chakra-ui/react";
import { ThemeToggler } from "./ThemeToggler";
import logo from "../../assets/light-bulb.png";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/Hooks/hooks";
import { getUserData } from "../../app/Features/UserProfile/UsersSlice";

export const Navbar = () => {
  const navText = useColorModeValue("gray.900", "white");
  const navBg = useColorModeValue("white", "pallet1.navyBlue");
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);

  return (
    <Box
      w="100%"
      p={{ base: "4", md: "0" }}
      bg={navBg}
      boxShadow="md"
      position="fixed"
      top="0"
      zIndex="10"
    >
      <Flex
        justify="space-between"
        color={navText}
        h="full"
        alignItems="center"
        w="60%"
        mx="auto"
      >
        <Flex h="50%">
          <Image src={logo} boxSize="30px" />
          <Text pl="2">Quiz Mania</Text>
        </Flex>
        <Flex
          direction="row"
          h="100%"
          display={{ base: "none", md: "flex" }}
          w="max"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text p="4" h="100%">
            <Link to="/">Home</Link>
          </Text>
          <Text
            p="4"
            h="100%"
            onClick={() => {
              dispatch(getUserData());
            }}
          >
            <Link to="/profile">{token ? "Profile" : "Login"}</Link>
          </Text>
          <ThemeToggler />
        </Flex>
      </Flex>
      <Flex
        direction="row"
        w="100%"
        bg={navBg}
        d={{ base: "flex", md: "none" }}
        position="fixed"
        bottom="0"
        left="0"
        alignItems="center"
        justifyContent="space-evenly"
        zIndex="10"
        boxShadow="var(--chakra-shadows-md)"
      >
        <Text p="4" h="100%">
          <Link to="/">Home</Link>
        </Text>
        <Text p="4" h="100%">
          <Link to="/profile">{token ? "Profile" : "Login"}</Link>
        </Text>
        <ThemeToggler />
      </Flex>
    </Box>
  );
};
