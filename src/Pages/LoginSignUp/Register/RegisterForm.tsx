import {     
    Box,
    Button,
    Heading,
    Stack,
    Text,
    VStack

} from "@chakra-ui/react"
import { useAppDispatch } from "../../../app/Hooks/hooks"
import { signUpUser } from "../../../app/Features/Auth/AuthSlice"
import * as yup from "yup"
import { Form, Formik } from "formik";
import { ChakraFormController } from "../Components/ChakraFormController";
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {
    
    const authDispatch = useAppDispatch()

    type registerFormValues = {
        firstName : string,
        lastName? : string,
        email : string,
        password : string,
        confirmPassword : string
    }
    const initialValues : registerFormValues = {
        firstName : "",
        lastName :"",
        email :"",
        password : "",
        confirmPassword : ""
    }
    const validationSchema = yup.object({
        firstName : yup.string().required("Required"),
        lastName : yup.string(),
        email : yup.string().email("Invalid Email format").required("Required"),
        password : yup.string().required("Required"),
        confirmPassword : yup.string().oneOf([yup.ref('password') , ''], "Passwords must match").required("Required")
    })
    const registerUser = ( values : registerFormValues ) => {
        const { firstName, lastName, email, password } = values
        console.log("Register form data:", values)
        authDispatch(signUpUser({ firstName, lastName, email, password }))
    }
    const navigate = useNavigate()

    return (
        <Stack spacing="2rem" h="100%" justifyContent="center" >
            <Heading fontSize="3xl">Register</Heading>
            <Formik 
                initialValues={initialValues}
                validationSchema={validationSchema}
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
    );
}