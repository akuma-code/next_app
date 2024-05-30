'use client'

import { _log } from "@/Helpers/helpersFns";
import { stringToColor } from "@/Helpers/stringToColor";
import { OpenInFullTwoTone } from "@mui/icons-material";
import { Box, Fab, Grid, Zoom } from "@mui/material";
import dayjs from "dayjs";
import 'dayjs/locale/ru'
import { DayOfWeek } from "@/Helpers/dateFuncs";
import { EventViewCard } from "@/Components/EventView/EventViewCard";
import AddIcon from '@mui/icons-material/Add'
import Link from "next/link";
export interface IEvent_Front {
    id: number;
    date_formated: string;
    title?: string | null
    players: {
        id: number;
        name: string;
    }[];
    _count?: { players: number }

}

export const avatarColor = (numb: number) => {
    const colors = {
        xs: 'grey',
        sm: 'darkgreen',
        md: 'orange',
        lg: 'darkorange',
        xl: 'red'

    }
    if (numb >= 10) return colors.xl
    if (numb >= 9) return colors.lg
    if (numb >= 7) return colors.md
    if (numb > 3) return colors.sm
    if (numb >= 0) return colors.xs
    return colors.md
}

export const EventsList: React.FC<{ events: IEvent_Front[] }> = ({ events }) => {

    const d = (date: string) => date.replaceAll("_", ".")
    const dm = (date: string) => dayjs(date, 'DD_MM_YYYY', 'ru').format("DD MMMM")


    const dayWeek = (d: string) => DayOfWeek[dayjs(d, 'DD.MM.YYYY', 'ru').weekday()]

    return (
        <Box
            bgcolor={ 'inherit' }
            p={ 1 }
            sx={ {
                borderBottomLeftRadius: 6,
                borderBottomRightRadius: 6,
                border: '2px solid black',
                borderTop: 0
            } }>

            <Grid container spacing={ 2 } maxWidth={ 500 }>
                { events.map(e =>

                    <Grid key={ e.id } item xs={ 6 } sm={ 4 } >

                        <EventViewCard

                            event={ e }
                            title={ dm(e.date_formated) }
                            subtitle={ dayjs().year().toString() }
                            description={ dayWeek(e.date_formated) }
                        />
                    </Grid>
                ) }
                <Grid item >

                    <Zoom

                        in={ !!events }
                        timeout={ 500 }

                        unmountOnExit
                    >
                        <Fab
                            aria-label={ "add event" }
                            color={ 'success' }
                            href="/avangard/events/create"
                            LinkComponent={ Link }

                        >

                            <AddIcon />

                        </Fab>
                    </Zoom>
                </Grid>
            </Grid>
        </Box>
    )
}

