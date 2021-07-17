import { Box, useColorModeValue } from "@chakra-ui/react"

export const OptionsContainer = ( 
    { _id , option, isRight } 
    :
    { _id: string; option: string; isRight: boolean }) => {

    return (
       <Box as="button" bg={ useColorModeValue('gray.200', 'gray.800') } h={'max-content'} rounded={'sm'} p={4} textAlign="left">
           { option }
       </Box> 
    );
}