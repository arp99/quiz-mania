import { 
    Box,
    Menu,
    MenuButton,
    MenuList,
    MenuItem 
} from "@chakra-ui/react";
import { FaRegUserCircle } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { logOutUser } from "../../../app/Features/Auth/AuthSlice"
import { useAppDispatch } from "../../../app/Hooks/hooks"

export const UserMenu = () => {
    const authDispatch = useAppDispatch()
    const navigate = useNavigate()
    
    return (
        <Menu>
            <MenuButton>
                <Box cursor="pointer" aria-label="Profile" >
                    <FaRegUserCircle size="2rem" />
                </Box>
            </MenuButton>
            <MenuList>
                <MenuItem onClick={()=>navigate("/user-profile")}>User Profile</MenuItem>
                <MenuItem 
                    onClick={()=>{
                        authDispatch(logOutUser())
                    }}
                >
                    Logout
                </MenuItem>
            </MenuList>
        </Menu>
    );
}