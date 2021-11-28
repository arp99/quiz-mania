import { Alert , AlertIcon, AlertTitle, CloseButton } from "@chakra-ui/react"

export const ErrorAlert = ({ children } : { children : string }) => {
    return (
        <Alert w="100vw">
            <AlertIcon />
            <AlertTitle mr={2}>{children}</AlertTitle>
            <CloseButton position="absolute" right="8px" top="8px" />
        </Alert>
    );
}