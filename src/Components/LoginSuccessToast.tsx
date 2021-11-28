import { useToast } from "@chakra-ui/react"

export const LoginSuccessToast = () => {
    const toast = useToast()
    return (
        <>
        {
            toast({
                title: "Login Successfull.",
                status: "success",
                position:"top",
                duration: 1000,
                isClosable: true,
              })
        }
        </>        
    );
}