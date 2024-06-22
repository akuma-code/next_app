'use client'

import { Button, MenuItem } from "@mui/material"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import MenuButton from "./MenuIconButton"

export const NavMenu = ({ user_id }: { user_id?: number | null }) => {

    const { status, data, update } = useSession()

    const lang = {
        authenticated: "в системе!",
        loading: "Загрузка...",
        unauthenticated: "Не авторизован"

    }


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
                            href={ '/admin/users/profile/' + user_id }
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
            {/* <MenuItem>{ lang[status] }</MenuItem> */ }
        </MenuButton>
    )
}