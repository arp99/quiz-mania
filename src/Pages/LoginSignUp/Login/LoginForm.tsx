import {     
    Box,
    Button,
    Grid,
    Heading,
    Image,
    Stack,
    Text,
    useToast,
    VStack

} from "@chakra-ui/react"
import { AiOutlineLogin } from "react-icons/ai"
import { useAppDispatch, useAppSelector } from "../../../app/Hooks/hooks"
import { loginUser, resetAuthState } from "../../../app/Features/Auth/AuthSlice"
import { Form, Formik } from "formik";
import { ChakraFormController } from "../Components/ChakraFormController";
import { useNavigate } from "react-router-dom";
import LoginImage from "../assets/quiz-vector.jpg"
import { FormValues } from "./FormConfig/FieldType";
import { initialValues, validationSchema } from "./FormConfig";
import { useEffect } from "react";

export const LoginForm = () => {
    const { authStatus } = useAppSelector((state) => state.auth )
    const authDispatch = useAppDispatch()
    const toast = useToast()
    const navigate = useNavigate()

    const loginHandler = (values : FormValues , onSubmitProps : any)  =>{
        const { emailId, password } = values
        const { resetForm, isSubmitting } = onSubmitProps
        authDispatch( loginUser({ email: emailId , password }))
        if(!isSubmitting){
            resetForm()
        }
    }

    useEffect(()=>{
        if( authStatus === "error" ){
            toast({
                title: "Wrong User Credentials",
                status: "warning",
                duration: 2000,
                isClosable: true,
                position:"top"
            })

            authDispatch( resetAuthState())
        }
    }, [ authStatus, toast, authDispatch ])

    return (
        <Grid h="100vh" templateColumns="repeat(2,1fr)" gap="24">
            <Box>
                <Image src={LoginImage} h="100%" w="100%" />
            </Box>
            <Stack spacing="2rem" h="100%" w="80%" justifyContent="center">
                <Heading fontSize="3xl">Login</Heading>
                <Formik 
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={loginHandler}
                >
                    <Form>
                        <VStack spacing="1.5rem" alignItems="flex-start">
                            <ChakraFormController
                                name="emailId"
                                id="emailId"
                                label="Email Address"
                                placeholder="Example: any@gmail.com" 
                                type="email"
                                control="chakraFormInput"
                                Required
                            />
                            <ChakraFormController 
                                name="password"
                                id="password"
                                label="Password"
                                placeholder="Enter Your Password"
                                type="password"
                                control="chakraFormInput"
                                Required
                            />
                            <Button 
                                rightIcon = {<AiOutlineLogin />}
                                type="submit"
                                isLoading = { authStatus === "loading" }
                                loadingText = "Logging in"
                            >
                                Login
                            </Button> 
                        </VStack>
                    </Form>
                </Formik>

                <Box>
                    <Text fontSize="sm" letterSpacing="0.1rem">
                        Not registered Yet? 
                        <Text 
                            as="span" 
                            decoration="underline" 
                            color="red.300" 
                            cursor="pointer"
                            onClick = { ()=> navigate("/register") }
                        >
                            Register
                        </Text>
                    </Text>
                </Box>
            </Stack>
        </Grid>
        
    );
}