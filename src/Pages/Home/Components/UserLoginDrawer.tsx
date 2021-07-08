import { 
    Drawer, 
    DrawerBody, 
    DrawerOverlay, 
    DrawerCloseButton,
    DrawerContent, 
    DrawerHeader, 
} from "@chakra-ui/react"
import { useState } from "react";
import { LoginForm } from "./LoginForm"
import { RegisterForm } from "./RegisterForm";

export const UserLoginDrawer = ({ isDrawerOpen , onDrawerClose }:{isDrawerOpen : boolean ; onDrawerClose : () => void}) => {
    const [ userRegistered , setUserRegistered] = useState<Boolean>(true)
    return (
        <Drawer
            isOpen={isDrawerOpen}
            placement="right"
            onClose={onDrawerClose}
            size="sm"
        >
            <DrawerOverlay />
            <DrawerContent >
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth="2px">
                    { userRegistered && "Login User" }
                    { !userRegistered && "Register User" }
                </DrawerHeader>
                <DrawerBody >
                    {userRegistered && <LoginForm setUserRegistered={setUserRegistered} />}
                    {!userRegistered && <RegisterForm setUserRegistered={setUserRegistered} />}
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
}