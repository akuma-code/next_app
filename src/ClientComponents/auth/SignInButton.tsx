'use client'
// import { signOut } from "@/auth/auth"
import { Button } from "@mui/material"
import { signIn, signOut } from "next-auth/react"

export function SignInButton() {

    return (
        <Button
            color="primary"
            variant="contained"
            size="small"
            onClick={ async () => await signIn() }>
            Авторизоваться
        </Button>
    )
}
export function SignOutButton() {
    return (
        <Button
            color="info"
            variant="contained"
            size="small"
            onClick={ async () => await signOut() }>
            Выйти
        </Button>
    )
}

