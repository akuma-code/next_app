'use client'

import { useToggle } from "@/Hooks/useToggle";

import { IconButton, Dialog, DialogTitle, DialogContent, ButtonGroup, Avatar, Button } from "@mui/material";

import { SignInButton, SignOutButton } from "./SignInButton";
import RegisterForm from "../RegisterForm";
import { useSession } from "next-auth/react";
import Link from "next/link";
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

                    <ButtonGroup fullWidth orientation="vertical" variant="contained">
                        <SignInButton />
                        <Button color="warning" size="small"
                            href={ '/api/auth/register' }
                            LinkComponent={ Link }
                        >
                            Зарегестрироватсья
                        </Button>
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