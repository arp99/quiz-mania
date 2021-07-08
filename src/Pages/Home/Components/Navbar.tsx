import { Flex ,Text, useColorMode, HStack, IconButton, useDisclosure} from "@chakra-ui/react";
import { FaSun , FaMoon } from 'react-icons/fa';
import { UserLoginDrawer } from "./UserLoginDrawer"
import { useAppDispatch, useAppSelector } from "../../../app/Hooks/hooks"
import { useEffect } from "react";


export const Navbar = () => {
    const { colorMode ,toggleColorMode } = useColorMode()
    const { isOpen , onOpen , onClose } = useDisclosure()

    const { token } = useAppSelector((state) => state.auth)
    return (
        <Flex 
            w="100%" 
            justifyContent="space-between"
            alignItems="baseline"
            p={4}
        >
            <Text>Brand</Text>
            <HStack>
                <IconButton 
                    aria-label="Toggle Theme" 
                    icon = { colorMode === "light"? <FaMoon /> : <FaSun/> } 
                    borderRadius={8}
                    onClick = { ()=>toggleColorMode() } 
                />
                { !token && <Text onClick={onOpen} cursor="pointer">Login</Text> }
                <UserLoginDrawer isDrawerOpen={isOpen} onDrawerClose={onClose} />
            </HStack>
        </Flex>
    );
}
