import { 
    Button,
    Flex,
    HStack, 
    Text, 
} from "@chakra-ui/react";
import { UserMenu , DarkModeToggler } from "../Components"
import { useAppSelector } from "../../../app/Hooks/hooks"
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const { token } = useAppSelector((state) => state.auth)

    const navigate = useNavigate()

    return (
        <Flex 
            w="100%" 
            justifyContent="space-between"
            alignItems="baseline"
            p={4}
        >
            <Text>Brand</Text>
            <HStack>
                <DarkModeToggler />
                { token && <UserMenu /> }
                {/* Login button gets automatically clicked when the logout is option is chosen */}
                { !token && <Button onClick={()=> navigate("/login")} cursor="pointer">Login</Button> }
            </HStack>
        </Flex>
    );
}
