'use client'

import { useToggle } from "@/Hooks/useToggle";

import { IconButton, Dialog, DialogTitle, DialogContent, ButtonGroup, Avatar } from "@mui/material";

import { SignInButton, SignOutButton } from "./SignInButton";
import LoginForm from "../LoginForm";
import { useSession } from "next-auth/react";
// import { _log } from "@/Helpers/helpersFns";


interface LoginDialogProps {

}

const LoginDialog: React.FC<LoginDialogProps> = () => {
    const [open, { on, off }] = useToggle(false)
    const s = useSession()
    const { status } = s

    const canLogout = status === 'authenticated'
    return (
        <>
            <IconButton onClick={ on }><Avatar sx={ { width: 26, height: 26 } } /></IconButton>
            <Dialog open={ open } onClose={ off }>
                <DialogTitle>
                    Регистрация
                </DialogTitle>
                <DialogContent>
                    <LoginForm />
                    <ButtonGroup fullWidth >
                        <SignInButton />

                        {
                            canLogout &&
                            <SignOutButton />
                        }

                    </ButtonGroup>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default LoginDialog;