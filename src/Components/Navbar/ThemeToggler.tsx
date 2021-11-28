import { IconButton , useColorMode } from "@chakra-ui/react"
import { FaSun , FaMoon } from 'react-icons/fa';

export const ThemeToggler = () => {
    const { colorMode ,toggleColorMode } = useColorMode()
    
    return (
        <IconButton 
            aria-label="Toggle Theme"
            variant="ghost"
            color="pallet1.blueGrotto"
            icon = { colorMode === "light"? <FaMoon /> : <FaSun/> } 
            // borderRadius={8}
            onClick = { ()=>toggleColorMode() } 
        />
    );
}

