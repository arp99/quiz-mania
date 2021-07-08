import {     
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Text,
    VStack

} from "@chakra-ui/react"
import React from "react";
import { useState } from "react";
import { AiOutlineLogin } from "react-icons/ai"
import { useAppDispatch, useAppSelector } from "../../../app/Hooks/hooks"
import { loginUser } from "../../../app/Features/Auth/AuthSlice"

export const LoginForm = ({ setUserRegistered } : {setUserRegistered : React.Dispatch<React.SetStateAction<Boolean>>}) => {
    const [ email , setEmail] = useState<string>("")
    const [ password , setPassword ] = useState<string>("")

    const { token , authStatus } = useAppSelector((state) => state.auth )
    const authDispatch = useAppDispatch()
    const loginHandler = () => {
        // if( authStatus === "idle"){
            authDispatch( loginUser({ email , password}))
        // }
    }
    console.log({ token , authStatus })
    return (
        <Stack spacing="2rem" h="100%" justifyContent="center">
            <VStack spacing="1.5rem" alignItems="flex-start">
                <FormControl id="email" isRequired>
                    <FormLabel fontSize="lg" >Email address</FormLabel>
                    <Input 
                        placeholder="Example: any@gmail.com" 
                        type="email"
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </FormControl>
                <FormControl id="password" isRequired>
                    <FormLabel fontSize="lg" >Password</FormLabel>
                    <Input 
                        placeholder="Enter Your Password" 
                        type="password" 
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </FormControl>
                <Button 
                    rightIcon = {<AiOutlineLogin />}
                    onClick = {()=>loginHandler()}
                    isLoading = { authStatus === "loading" }
                    loadingText = "Logging in"
                >
                   Login
                </Button> 
            </VStack>
            <Box>
                <Text fontSize="sm" letterSpacing="0.1rem">
                    Not registered Yet? 
                    <Text 
                        as="span" 
                        decoration="underline" 
                        color="red.300" 
                        cursor="pointer"
                        onClick = { ()=>setUserRegistered((prev)=>!prev) }
                    >
                        Register
                    </Text>
                </Text>
            </Box>
        </Stack>
    );
}