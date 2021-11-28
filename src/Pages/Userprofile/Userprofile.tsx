import { Box, Button, Center, Heading, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/Hooks/hooks";

export const Userprofile = () => {
    
    const { firstName, lastName, attemptedQuiz } = useAppSelector(( state ) => state.user )
    const { name } = attemptedQuiz[0].quizId 
    const { score } = attemptedQuiz[0]
    const navigate = useNavigate()

    return (
        <VStack justify="center" h={'100vh'}  p={0} >
            <VStack 
                boxShadow={'2xl'}  
                maxW="40vw" 
                minH={'40vh'} 
                justifyContent="space-between" 
                rounded={'xl'} 
                p={8} 
                bg={useColorModeValue('white', 'gray.700')}  
            >
                <Box>
                    <Center>
                        User Information
                    </Center>
                    <Text fontSize="lg" letterSpacing="0.15rem" align="center" >
                        Firstname : { firstName }
                    </Text>
                    <Text fontSize="lg" letterSpacing="0.15rem" align="center" >
                        Lastname : { lastName }
                    </Text>
                    <Heading >Attempted Quiz:</Heading>
                    <Text fontSize="lg" letterSpacing="0.15rem" align="center" >{ name } | Score : { score } </Text>
                </Box>                
                <Button onClick = { ()=>navigate("/") }>Back To Home</Button>
            </VStack>
        </VStack>
    );
}
