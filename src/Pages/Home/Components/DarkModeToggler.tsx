import { IconButton , useColorMode } from "@chakra-ui/react"
import { FaSun , FaMoon } from 'react-icons/fa';

export const DarkModeToggler = () => {
    const { colorMode ,toggleColorMode } = useColorMode()
    
    return (
        <IconButton 
            aria-label="Toggle Theme" 
            icon = { colorMode === "light"? <FaMoon /> : <FaSun/> } 
            borderRadius={8}
            onClick = { ()=>toggleColorMode() } 
        />
    );
}

