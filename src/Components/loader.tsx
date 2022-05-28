import { Flex } from "@chakra-ui/react";
import Loader from "react-loader-spinner";

export const Spinner = () => {
    return (
        <Flex justifyContent={'center'} w="full" paddingTop={'1.5rem'}>
            <Loader
                type="ThreeDots"
                color="#00BFFF"
                height={100}
                width={100}
            />
        </Flex>
    );
}