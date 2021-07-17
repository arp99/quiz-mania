import { 
    Button, 
    Center, 
    Heading,
    HStack,
    Text, 
    VStack,
    useColorModeValue 
} from "@chakra-ui/react"
import { Quiz } from "../../../app/Types/Quiz.types";
import { InstructionIcon } from "./InstructionIcon"
import { BsInfo } from "react-icons/bs";
import { FcAlarmClock } from "react-icons/fc";

export const InstructionContainer = ({ currentQuiz } : { currentQuiz : Quiz | null } ) => {
     
    return (
        <VStack justify="center" h={'100vh'}  p={0} >
            <VStack boxShadow={'2xl'}  maxW="40vw" minH={'50vh'}  rounded={'xl'} p={8} bg={useColorModeValue('white', 'gray.700')}  >
                <Center >
                    <InstructionIcon width="5rem" />
                </Center>
                <Heading>{ currentQuiz?.name }</Heading>
                <HStack alignSelf="flex-start" >
                    <BsInfo size="2rem" />
                    <Text fontSize="lg" letterSpacing="0.15rem" >There are total {currentQuiz?.questions.length} questions</Text>
                </HStack>
                <HStack alignSelf="flex-start">
                    <BsInfo size="2rem" />
                    <Text fontSize="lg" letterSpacing="0.15rem" >
                        10 marks for every{' '} 
                        <Text as="span" fontWeight="bold" color="green.400" letterSpacing="0.15rem">
                            Right Answer{' '}
                        </Text>
                        and 5 negative marks for{' '} 
                        <Text as="span" fontWeight="bold" color="red.400" letterSpacing="0.15rem">
                            Wrong Answer
                        </Text>
                    </Text>
                </HStack>
                <HStack alignSelf="flex-start" >
                    <BsInfo size="2rem" />
                    <Text fontSize="lg" letterSpacing="0.15rem" >
                        There will be a Timer for Whole Quiz
                    </Text>
                    <FcAlarmClock size="2rem" />
                </HStack>
                <HStack alignSelf="flex-start" >
                    <BsInfo size="2rem" />
                    <Text fontSize="lg" letterSpacing="0.15rem" >
                        You cannot Skip any Question 😅
                    </Text>
                </HStack>
                <Center>
                    <Button 
                        bg={'blue.500'} 
                        rounded={'lg'} 
                        color={'white'} 
                        flex={'1 0 auto'} 
                        letterSpacing="0.15rem"
                    >
                    Start Quiz
                    </Button>
                </Center>
            </VStack>
        </VStack>
    );
}
