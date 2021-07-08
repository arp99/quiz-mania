import { Box , Image, Heading, Text, Button ,VStack} from "@chakra-ui/react";

export const QuizCard = ({ 
        QuizName , 
        description , 
        imageUrl
    } 
    : { 
        QuizName : string , 
        description : string , 
        imageUrl : string 
    }) => {
    return (
        <Box maxW="sm" borderRadius="lg" overflow="hidden" borderWidth="2px">
            <Image src={imageUrl} alt="Quiz Image" aria-label="Quiz image" w="100%" h="15rem" />
            <VStack p={4} align="flex-start">
                <Box>
                    <Heading>{QuizName}</Heading>
                    <Text>{description}</Text>
                </Box>
                <Button colorScheme="teal" px="2rem" size="lg">Play</Button>
            </VStack>
        </Box>
    );
}

