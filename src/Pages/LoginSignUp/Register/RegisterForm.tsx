import {     
    Box,
    Button,
    Grid,
    Heading,
    Image,
    Stack,
    Text,
    VStack

} from "@chakra-ui/react"
import { useAppDispatch } from "../../../app/Hooks/hooks"
import { signUpUser } from "../../../app/Features/Auth/AuthSlice"
import { Form, Formik } from "formik";
import { ChakraFormController } from "../Components/ChakraFormController";
import { useNavigate } from "react-router-dom";
import LoginImage from "../assets/quiz-vector.jpg"
import { registerFormValues } from "./FormConfig/FieldType";
import { initialValues, validationSchema } from "./FormConfig";

export const RegisterForm = () => {
    
    const authDispatch = useAppDispatch()

    const registerUser = ( values : registerFormValues ) => {
        const { firstName, lastName, email, password } = values
        console.log("Register form data:", values)
        authDispatch(signUpUser({ firstName, lastName, email, password }))
    }
    const navigate = useNavigate()

    return (
        <Grid h="100vh" templateColumns="repeat(2,1fr)" gap="24">
            <Box>
                <Image src={LoginImage} h="100%" w="100%" />
            </Box>
            <Stack spacing="2rem" h="100%" w="80%" justifyContent="center" >
                <Heading fontSize="3xl">Register</Heading>
                <Formik 
                    initialValues={ initialValues }
                    validationSchema={ validationSchema }
                    onSubmit={ registerUser }
                >
                    <Form >
                        <VStack spacing="1.5rem" alignItems="flex-start">
                            <ChakraFormController
                                name="firstName"
                                id="firstName"
                                label="First Name"
                                type="text"
                                placeholder="Enter First Name"
                                control="chakraFormInput"
                                Required
                            />
                            <ChakraFormController
                                name="lastName"
                                id="lastName"
                                label="Last Name"
                                type="text"
                                placeholder="Enter Last Name"
                                control="chakraFormInput"
                            />
                            <ChakraFormController
                                name="email"
                                id="email"
                                label="Email"
                                type="email"
                                placeholder="Example: any@gmail.com"
                                control="chakraFormInput"
                                Required
                            />
                            <ChakraFormController
                                name="password"
                                id="password"
                                label="Password"
                                type="password"
                                placeholder="Enter New password"
                                control="chakraFormInput"
                                Required
                            />
                            <ChakraFormController
                                name="confirmPassword"
                                id="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                placeholder="Confirm New password"
                                control="chakraFormInput"
                                Required
                            />
                            <Button type="submit">Register</Button>
                        </VStack>
                    </Form>
                </Formik>
                <Box>
                    <Text fontSize="sm" letterSpacing="0.1rem">
                        Already registered? 
                        <Text 
                            as="span" 
                            decoration="underline" 
                            color="red.300" 
                            cursor="pointer"
                            onClick = { ()=> navigate("/login") }
                        >
                            Login Instead
                        </Text>
                    </Text>
                </Box>
            </Stack>
        </Grid>
    );
}