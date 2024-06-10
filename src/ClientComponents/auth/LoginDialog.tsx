'use client'

import { useToggle } from "@/Hooks/useToggle";
import { Settings } from "@mui/icons-material";
import { IconButton, Dialog, DialogTitle, DialogContent, ToggleButton, ButtonGroup, Avatar } from "@mui/material";
import { on } from "events";
import { off } from "process";
import { SignInButton, SignOutButton } from "./SignInButton";
import LoginForm from "../LoginForm";
import { useSession } from "next-auth/react";
import { _log } from "@/Helpers/helpersFns";


interface LoginDialogProps {

}

const LoginDialog: React.FC<LoginDialogProps> = () => {
    const [open, { on, off }] = useToggle(false)
    const s = useSession()
    const { data } = s
    // _log("user: ", data?.user)
    const canLogout = !!data?.user
    return (
        <>
            <IconButton onClick={ on }><Avatar sx={ { width: 26, height: 26 } } /></IconButton>
            <Dialog open={ open } onClose={ off }>
                <DialogTitle>
                    Авторизация
                </DialogTitle>
                <DialogContent>
                    <LoginForm />
                    <ButtonGroup fullWidth >
                        <SignInButton />

                        { canLogout && <SignOutButton /> }

                    </ButtonGroup>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default LoginDialog;