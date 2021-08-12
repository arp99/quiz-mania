import * as yup from "yup"

export const validationSchema = yup.object({
    firstName : yup.string().required("Required"),
    lastName : yup.string(),
    email : yup.string().email("Invalid Email format").required("Required"),
    password : yup.string().required("Required"),
    confirmPassword : yup.string().oneOf([yup.ref('password') , ''], "Passwords must match").required("Required")
})