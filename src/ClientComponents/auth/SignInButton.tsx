"use client";
// import { signOut } from "@/auth/auth"
import { Button } from "@mui/material";
import { signIn, signOut } from "next-auth/react";

export function SignInButton() {
    return (
        <Button
            color="info"
            variant="contained"
            size="small"
            onClick={() => signIn()}
            sx={{ fontSize: 12, fontFamily: "Fira Code" }}
        >
            Авторизоваться
        </Button>
    );
}
export function SignOutButton() {
    return (
        <Button
            color="info"
            variant="contained"
            size="small"
            onClick={async () => await signOut()}
            sx={{ fontSize: 12, fontFamily: "Fira Code" }}
        >
            Выйти
        </Button>
    );
}
