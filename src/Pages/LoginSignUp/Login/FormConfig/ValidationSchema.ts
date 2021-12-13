import * as Yup from "yup"

export const validationSchema = Yup.object({
    emailId: Yup.string().email("Invalid Email Format").required("Required"),
    password: Yup.string().required("Required")
}) 