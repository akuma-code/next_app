'use client'

import { signOut, useSession } from "next-auth/react"
import MenuButton from "./MenuIconButton"
import { SignInButton, SignOutButton } from "../auth/SignInButton"
import { Button, MenuItem } from "@mui/material"
import Link from "next/link"

export const NavMenu = () => {

    const { status, data } = useSession()

    const lang = {
        authenticated: "в системе!",
        loading: "Загрузка...",
        unauthenticated: "Не авторизован"

    }

    const userId = data?.user?.id as unknown as number
    return (
        <MenuButton >
            {
                !data ? <MenuItem divider>
                    <Button color="primary" size="small"
                        href={ '/api/auth/signin' }
                        LinkComponent={ Link }
                    >Авторизация</Button>
                </MenuItem>
                    :
                    <MenuItem divider>
                        <Button color="primary" size="small"
                            href={ '/admin/users/profile/' + userId }
                            LinkComponent={ Link }
                        >Профиль</Button>
                    </MenuItem>
            }
            { !data && <MenuItem divider>
                <Button color="secondary" size="small"
                    href={ '/api/auth/register' }
                    LinkComponent={ Link }
                >
                    Регистрация
                </Button>
            </MenuItem> }

            { !!data && <MenuItem divider>
                <Button color="error" size="small"
                    onClick={ () => signOut() }
                >
                    Выйти
                </Button>
            </MenuItem> }
            <MenuItem disabled>{ lang[status] }</MenuItem>
        </MenuButton>
    )
}