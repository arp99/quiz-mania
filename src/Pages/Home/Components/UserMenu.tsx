import { 
    Box,
    Menu,
    MenuButton,
    MenuList,
    MenuItem 
} from "@chakra-ui/react";
import { useCallback } from "react";
import { useEffect } from "react";
import { FaRegUserCircle } from 'react-icons/fa';
import { logOutUser } from "../../../app/Features/Auth/AuthSlice"
import { getUserData } from "../../../app/Features/UserProfile/UsersSlice";
import { useAppDispatch, useAppSelector } from "../../../app/Hooks/hooks"

export const UserMenu = () => {
    const authDispatch = useAppDispatch()
    const { token } = useAppSelector((state) => state.auth)
    const { status, firstName } = useAppSelector((state)=> state.user)
    const userDispatch = useAppDispatch()
    const fetchUserData = useCallback(()=>{
        userDispatch( getUserData(token) )
    },[ token, userDispatch ])

    useEffect(() => {
        fetchUserData()
    },[ fetchUserData ]);

    console.log({status , firstName})
    console.log("User menu rendered")
    return (
        <Menu>
            <MenuButton>
                <Box cursor="pointer" aria-label="Profile" >
                    <FaRegUserCircle size="2rem" />
                </Box>
            </MenuButton>
            <MenuList>
                <MenuItem>User Profile</MenuItem>
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