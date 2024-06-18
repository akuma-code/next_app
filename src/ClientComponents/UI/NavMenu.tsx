'use client'

import { signOut, useSession } from "next-auth/react"
import MenuButton from "./MenuIconButton"
import { SignInButton, SignOutButton } from "../auth/SignInButton"
import { Button, MenuItem } from "@mui/material"
import Link from "next/link"

export const NavMenu = () => {

    const { status } = useSession()
    const canLogout = status === 'authenticated'
    return (
        <MenuButton >
            <MenuItem divider>
                <Button color="primary" size="small"
                    href={ '/api/auth/signin' }
                    LinkComponent={ Link }
                >Авторизация</Button>
            </MenuItem>
            <MenuItem divider>
                <Button color="secondary" size="small"
                    href={ '/api/auth/register' }
                    LinkComponent={ Link }
                >
                    Регистрация
                </Button>
            </MenuItem>
            {
                canLogout &&
                <MenuItem>
                    <Button color="error" size="small"
                        onClick={ () => signOut() }
                    >
                        Выйти
                    </Button>
                </MenuItem>
            }
        </MenuButton>
    )
}