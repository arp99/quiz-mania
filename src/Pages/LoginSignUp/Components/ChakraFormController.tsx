import { ChakraFormInput } from "./ChakraFormInput"

export const ChakraFormController = ( props : any ) => {
    const { control, ...rest } = props
    switch(control){
        case "chakraFormInput" : return <ChakraFormInput { ...rest } />
        default : return null
    }
}