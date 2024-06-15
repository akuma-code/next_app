'use client'

import { _log, _promptVar } from "@/Helpers/helpersFns"
import { useToggle } from "@/Hooks/useToggle"
import { seedEvents } from "@/Services/eventService"
import { seedPlayers } from "@/Services/playerService"
import { Button, ButtonGroup } from "@mui/material"

import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useMemo } from "react"


export const RestoreButtons: React.FC<{ restore?: string }> = () => {
    const [load, { on, off, toggle }] = useToggle(false)
    const path = usePathname()
    const s = useSearchParams()
    const router = useRouter()
    const prevq = s.get('data')
    const isLog = useMemo(() => load === true ? "on" as const : "off" as const, [load])
    // _log(Object.entries(s.))
    return (
        <ButtonGroup>
            <Link href={ {
                pathname: path,
                query: { data: 'players', log: isLog }

            } }>
                <Button  >
                    log players
                </Button>
            </Link>
            <Link href={ {
                pathname: path,
                query: { data: 'events', log: isLog }

            } }> <Button  >
                    log events
                </Button></Link>

            <Link href={ {
                pathname: path,
                query: { data: 'users', log: isLog }

            } }><Button  >
                    log users
                </Button>
            </Link>
            <Button variant="contained" disabled color="error">Logging: { isLog }</Button>
            <Link href={ {
                pathname: path,
                query: { data: prevq, log: isLog }
            } }
            >
                <Button variant="outlined" onClick={ () => {

                    load === false ? on() : off()
                    router.push(path + `?${prevq}&log=${isLog}`,)
                } }>

                    Toggle Log
                </Button>
            </Link>
            {/* <Link href={ {
                pathname: path,
                query: { data: prevq, log: 'off' }
            } }
            >
                <Button variant="outlined" onClick={ off }>

                    Log off
                </Button>
            </Link> */}
        </ButtonGroup>
    )
}

