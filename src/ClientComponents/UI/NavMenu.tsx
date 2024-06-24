'use client'

// import { signOut } from "@/auth/auth"
import { Button, MenuItem } from "@mui/material"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import MenuIconButton from "./MenuIconButton"

export const NavMenu = ({ user_id }: { user_id?: number | null }) => {

    const { status, data, update } = useSession()

    const lang = {
        authenticated: "в системе!",
        loading: "Загрузка...",
        unauthenticated: "Не авторизован"

    }


    return (
        <MenuIconButton >
            {
                !data ? <MenuItem divider>
                    <Button color="primary" size="small"
                        href={ '/api/auth/signin' }
                        LinkComponent={ Link }
                    >Авторизация</Button>
                </MenuItem>
                    :
                    user_id ? <MenuItem divider>
                        <Button color="primary" size="small"
                            href={ '/admin/users/profile/' + user_id }
                            LinkComponent={ Link }
                        >Профиль</Button>
                    </MenuItem>
                        : null
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
        </MenuIconButton>
    )
}