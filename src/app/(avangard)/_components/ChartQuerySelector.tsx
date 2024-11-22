'use client'

import { toQuery } from "@/Hooks/useQuerySearch";
import { Box, MenuItem, TextField, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export function ChartQuerySelector({ view }: { view?: string }) {

    const [viewState, setViewState] = useState(view || "players");

    const r = useRouter()
    const path = usePathname()
    const textToSelector = {
        players: "Top 15 по количеству тренировок",
        events: "Всего игроков за месяц"
    }

    const textHelper = (prop: string) => prop in textToSelector ? textToSelector[prop as keyof typeof textToSelector] : ""


    const viewChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { value } } = e
        setViewState(prev => value)
        const query = toQuery({ view: value })

        r.replace(path + query)

    }
    return <Box
        // border={ "1px solid" }
        p={ 1 }
        display={ 'flex' }
        justifyContent={ 'space-between' }
        alignItems={ 'center' }
        gap={ 1 }
        flexDirection={ 'row' }

    >
        <TextField
            id="charts_view_select"
            name="charts_view"
            select
            variant="filled"
            value={ viewState }
            onChange={ viewChanger }
            slotProps={ {
                input: { id: "charts_view_input" },
                inputLabel: { htmlFor: "charts_view_input" }
            } }
            fullWidth
            sx={ { maxWidth: 180 } }
            label={ "сводка по" }

        >


            <MenuItem value={ "players" } >
                Игрокам
            </MenuItem>
            <MenuItem value={ 'events' }>
                Тренировкам
            </MenuItem>

        </TextField>
        <Typography
            variant="body1"
            whiteSpace={ 'balance' }
            // maxWidth={ 300 }
            flexGrow={ 0 }
        >

            { textHelper(viewState || 'players') }
        </Typography>


    </Box>;
}