import {     
    Box,
    Button,
    Heading,
    Stack,
    Text,
    VStack

} from "@chakra-ui/react"
import { AiOutlineLogin } from "react-icons/ai"
import { useAppDispatch, useAppSelector } from "../../../app/Hooks/hooks"
import { loginUser } from "../../../app/Features/Auth/AuthSlice"
import { Form, Formik } from "formik";
import * as Yup from "yup"
import { ChakraFormController } from "../Components/ChakraFormController";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
    const { authStatus } = useAppSelector((state) => state.auth )
    const authDispatch = useAppDispatch()

    type FormValues = {
        emailId: string;
        password: string;
    }

    const initialValues : FormValues = {
        emailId : "",
        password : ""
    }

    const validationSchema = Yup.object({
        emailId: Yup.string().email("Invalid Email Format").required("Required"),
        password: Yup.string().required("Required")
    }) 
    const loginHandler = (values : FormValues , onSubmitProps : any)  =>{
        const { emailId, password } = values
        const { resetForm, isSubmitting } = onSubmitProps
        authDispatch( loginUser({ email: emailId , password }))
        if(!isSubmitting){
            resetForm()
        }
    }
    const navigate = useNavigate()

    return (
        <Stack spacing="2rem" h="100%" justifyContent="center">
            <Heading fontSize="3xl">Login</Heading>
            <Formik 
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={loginHandler}
            >
                <Form >
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
    );
}