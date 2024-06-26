'use client'

// import { auth } from "@/auth/auth"
import { Button, MenuItem } from "@mui/material"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import MenuIconButton from "./MenuIconButton"

import { useMemo } from "react"
import { usePathname } from "next/navigation"
import Icon from "@mdi/react"
import { mdiAccountSettings, mdiEyeSettings } from "@mdi/js"

export const NavMenu = ({ user_id }: { user_id?: number | null }) => {

    const { data } = useSession()
    const pathname = usePathname()
    // const session = auth()
    const lang = {
        authenticated: "в системе!",
        loading: "Загрузка...",
        unauthenticated: "Не авторизован"

    }

    const ID = useMemo(() => {

        return data?.user_id
    }, [data?.user_id])
    return (
        <MenuIconButton icon={<Icon path={mdiAccountSettings} size={1} />} title="Settings" avatar_bg={data ? "primary.dark" : "#890ac4"}>
            <MenuItem divider disabled>
                {data?.user.email ?? "Не авторизован!"}
            </MenuItem>
            {
                ID ?
                    <MenuItem divider>
                        <Link
                            color="primary"
                            href={{
                                pathname: `/admin/users/profile/${ID}`,


                            }}

                        >Профиль
                        </Link>
                    </MenuItem>
                    :
                    <MenuItem divider>
                        <Link
                            href={'/api/auth/login'}

                        >
                            Авторизация
                        </Link>
                    </MenuItem>

            }
            {!ID && <MenuItem divider>
                <Link
                    color="secondary"
                    href={'/api/auth/register'}

                >
                    Регистрация
                </Link>
            </MenuItem>}

            <MenuItem divider>
                <Button color="error" size="small"
                    onClick={() => signOut()}
                >
                    Выйти
                </Button>
            </MenuItem>
            {/* <MenuItem>{ lang[status] }</MenuItem> */}
        </MenuIconButton>
    )
}