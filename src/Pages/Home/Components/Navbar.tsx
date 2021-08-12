import { useEffect } from "react"
import { 
    Button,
    Flex,
    HStack, 
    Text, 
} from "@chakra-ui/react";
import { UserMenu , DarkModeToggler } from "../Components"
import { useAppSelector, useAppDispatch } from "../../../app/Hooks/hooks"
import { getUserData } from "../../../app/Features/UserProfile/UsersSlice"
import { logOutUser } from "../../../app/Features/Auth/AuthSlice"
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const { token } = useAppSelector((state) => state.auth)
    const { status } = useAppSelector((state)=> state.user)
    const userDispatch = useAppDispatch()
    const authDispatch = useAppDispatch()
    useEffect(() => {
        userDispatch( getUserData(token) )
    }, [ userDispatch , token]);
    
    useEffect(()=>{
        if(status === "error"){
            authDispatch(logOutUser());
        }
    },[status , authDispatch])
    console.log({status})
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
