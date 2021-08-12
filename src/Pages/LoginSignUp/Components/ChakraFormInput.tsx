import { 
    FormControl, 
    FormErrorIcon, 
    FormErrorMessage, 
    FormLabel, 
    Input 
} from "@chakra-ui/react";
import { Field } from "formik";

export const ChakraFormInput = (props : any ) => {
    const { label,name,id,Required, ...rest } = props

    return (
        <Field name={name} >
            {
                ({ field , form } : { field : any , form : any }) => {
                    return (
                        Required ?
                            (
                                <FormControl 
                                    id={id}
                                    isRequired
                                    isInvalid={ form.errors[name] && form.touched[name] }
                                >
                                    <FormLabel fontSize="md">{ label }</FormLabel>
                                    <Input 
                                        { ...rest }
                                        { ...field }
                                    />
                                    <FormErrorMessage letterSpacing="0.1rem" >
                                        <FormErrorIcon />{ form.errors[name] }
                                    </FormErrorMessage>
                                </FormControl>
                            ) 
                            : 
                            (
                                <FormControl 
                                    id={id}
                                >
                                    <FormLabel fontSize="md">{ label }</FormLabel>
                                    <Input 
                                        { ...rest }
                                        { ...field }
                                    />
                                </FormControl>
                            )
                    )
                }
            }
        </Field>    
    );
}