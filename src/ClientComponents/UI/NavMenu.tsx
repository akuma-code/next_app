'use client'

// import { auth } from "@/auth/auth"
import { Button, MenuItem } from "@mui/material"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import MenuIconButton from "./MenuIconButton"

import { useMemo, useState } from "react"
import { usePathname } from "next/navigation"
import Icon from "@mdi/react"
import { mdiAccountSettings, mdiEyeSettings } from "@mdi/js"
import LinkMui from "./LinkMui"
type AuthAState = {
    user?: { id: number, name: string } | null,
    user_id?: number | null
    status: "authenticated" | "loading" | "unauthenticated"
}

const lang = {
    authenticated: "в системе!",
    loading: "Загрузка...",
    unauthenticated: "Не авторизован"

}
export const NavMenu = ({ user_id }: { user_id?: number | null }) => {
    const { data, status } = useSession()
    const [authState, setAuth] = useState<AuthAState>({ user: null, user_id: null, status: "unauthenticated" })
    const pathname = usePathname()
    // const session = auth()

    const updateState = (state: "login" | "logout") => {
        switch (state) {
            case "login": { setAuth(prev => ({ ...prev, status: "authenticated", user_id: data?.user_id })); break }
            case "logout": {
                signOut({ redirect: true, callbackUrl: '/' })
                setAuth(prev => ({ ...prev, status: "unauthenticated", user_id: null }))
                break
            }
            default: setAuth(prev => ({ ...prev, status })); break
        }

        console.table(authState)

    }
    const ID = useMemo(() => {

        return data?.user_id
    }, [data])
    return (
        <MenuIconButton icon={ <Icon path={ mdiAccountSettings } size={ 1 } /> } title="Settings" avatar_bg={ user_id ? "primary.dark" : "#890ac4" }>
            <MenuItem divider disabled>
                { user_id ? data?.user.email : "Не авторизован!" }
            </MenuItem>
            {
                user_id ?
                    <MenuItem divider onClick={ () => updateState('login') }>
                        <LinkMui
                            color="primary"
                            href={ `/profile/${user_id}` }

                        >Профиль
                        </LinkMui>
                    </MenuItem>
                    :
                    <MenuItem divider onClick={ () => updateState('login') }>
                        <LinkMui href={ '/api/auth/login' } >
                            Авторизация
                        </LinkMui>
                    </MenuItem>

            }
            { !user_id && <MenuItem divider>
                <LinkMui
                    color="secondary"
                    href={ '/api/auth/register' }

                >
                    Регистрация
                </LinkMui>
            </MenuItem> }

            <MenuItem divider onClick={ () => updateState('logout') }>
                <Button color="error" size="small"
                // onClick={ () => signOut({ redirect: true, callbackUrl: '/' }) }
                >
                    Выйти
                </Button>
            </MenuItem>
            {/* <MenuItem>{ lang[status] }</MenuItem> */ }
        </MenuIconButton>
    )
}