import { Alert , AlertIcon, AlertTitle } from "@chakra-ui/react"

export const ErrorAlert = ({ children } : { children : string }) => {
    return (
        <Alert>
            <AlertIcon />
            <AlertTitle mr={2}>{children}</AlertTitle>
        </Alert>
    );
}