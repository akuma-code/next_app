'use client'
import { Button } from "@mui/material"
import { signIn } from "next-auth/react"

export function SignInButton() {
    return <Button
        color="secondary"
        variant="contained"
        onClick={ () => signIn() }>Sign In</Button>
}