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
import { useState } from "react";
import { useAppDispatch } from "../../../app/Hooks/hooks"
import { signUpUser } from "../../../app/Features/Auth/AuthSlice"


export const RegisterForm = ({ setUserRegistered } : {setUserRegistered : React.Dispatch<React.SetStateAction<Boolean>>}) => {
    const [ fName , setFname ] =  useState<string>("")
    const [ lName , setLname ] =  useState<string>("")
    const [ email , setEmail ] =  useState<string>("")
    const [ password , setPassword ] =  useState<string>("")

    const authDispatch = useAppDispatch()
    const registerUser = async() => {
        authDispatch(signUpUser({ firstName : fName , lastName : lName ,email : email ,password }))
    }
    return (
        <Stack spacing="2rem" h="100%" justifyContent="center">
            <VStack spacing="1.5rem" alignItems="flex-start">
                <FormControl id="f-name" isRequired>
                    <FormLabel fontSize="lg" >First Name</FormLabel>
                    <Input placeholder="Enter First Name" type="text" onChange={(e)=>setFname(e.target.value)} />
                </FormControl>
                <FormControl id="l-name">
                    <FormLabel fontSize="lg">Last Name</FormLabel>
                    <Input placeholder="Enter Last Name" type="text" onChange={(e)=>setLname(e.target.value)} />
                </FormControl>
                <FormControl id="email" isRequired>
                    <FormLabel fontSize="lg" >Email address</FormLabel>
                    <Input placeholder="Example: any@gmail.com" type="email" onChange={(e)=>setEmail(e.target.value)} />
                </FormControl>
                <FormControl id="password" isRequired>
                    <FormLabel fontSize="lg" >New Password</FormLabel>
                    <Input placeholder="Enter New Password" type="password" onChange={(e)=>setPassword(e.target.value)} />
                </FormControl>
                <FormControl id="password-confirm" isRequired>
                    <FormLabel fontSize="lg" >Confirm Password</FormLabel>
                    <Input placeholder="Confirm New Password" type="password" />
                </FormControl>
                <Button onClick={()=> registerUser()} >Register</Button> {/*<--- To be changed to loading button when form submit to server is implemented */}
            </VStack>
            <Box>
                <Text fontSize="sm" letterSpacing="0.1rem">
                    Already registered? 
                    <Text 
                        as="span" 
                        decoration="underline" 
                        color="red.300" 
                        cursor="pointer"
                        onClick = { ()=>setUserRegistered((prev)=>!prev) }
                    >
                        Login Instead
                    </Text>
                </Text>
            </Box>
        </Stack>
    );
}