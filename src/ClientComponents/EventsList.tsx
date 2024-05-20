'use client'

import { _log } from "@/Helpers/helpersFns";
import { stringToColor } from "@/Helpers/stringToColor";
import { OpenInFullTwoTone, OpenWithTwoTone } from "@mui/icons-material";
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, Grid, IconButton, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import 'dayjs/locale/ru'
import { DayOfWeek } from "@/Helpers/dateFuncs";
import { EventViewCard } from "@/Components/EventView/EventViewCard";
export interface IEvent_Front {
    id: number;
    date_formated: string;
    title?: string
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

export const EventsList: React.FC<{ events: IEvent_Front[] }> = ({ events }: { events: IEvent_Front[] }) => {

    const d = (date: string) => date.replaceAll("_", ".")
    const dm = (date: string) => dayjs(date, 'DD_MM_YYYY', 'ru').format("DD MMMM")


    const dayWeek = (d: string) => DayOfWeek[dayjs(d, 'DD.MM.YYYY', 'ru').weekday()]

    return (
        <Box bgcolor={ '#ebb8ff' } p={ 1 } maxWidth={ 550 }>
            {/* <Stack flexWrap={ 'wrap' } maxWidth={ 450 } direction={ 'row' } rowGap={ 1 } columnGap={ 2 }> */ }
            <Grid container spacing={ 2 } maxWidth={ 500 }>
                { events.map(e =>

                    <Grid key={ e.id } item xs={ 6 } lg={ 4 }>

                        <EventViewCard

                            event={ e }
                            title={ dm(e.date_formated) }
                            subtitle={ dayWeek(e.date_formated) }
                            description={ "всего: " + e._count?.players + " человек" }
                        />
                    </Grid>
                ) }
                {/* </Stack> */ }
            </Grid>
        </Box>
    )
}

export const EventCard: React.FC<{ event: IEvent_Front }> = ({ event }) => {

    const { id, date_formated, title = 'Avangard', players } = event
    const pathname = usePathname()

    const d = date_formated.replaceAll("_", ".")


    const dayWeek = dayjs(d, 'DD.MM.YYYY', 'ru').weekday()


    // _log(stringToColor('8'))
    return (
        <Card sx={ { maxWidth: 150, m: .4 } } square={ false } >
            <CardHeader
                title={ d }
                subheader={ DayOfWeek[dayWeek] }
                subheaderTypographyProps={ { textAlign: 'left' } }
                titleTypographyProps={ { fontSize: 20, textAlign: 'center' } }
                sx={ { pb: 0, my: 0 } }
            />
            <CardContent component={ Stack } rowGap={ .5 } sx={ { px: 1, my: 0, py: 0.4 } } alignItems={ 'center' }>



                <Stack direction={ 'row' } spacing={ 1 }>
                    <Typography variant="body1">Игроков: </Typography>
                    <Avatar variant="circular" alt={ title } sizes="small"
                        sx={ { width: 28, height: 28, bgcolor: avatarColor(players.length), fontSize: 16 } }
                    >
                        { players.length }
                    </Avatar>


                </Stack>
            </CardContent>
            <CardActions disableSpacing sx={ { py: 0, my: 0, justifyContent: 'end' } } >
                <Link href={ {
                    pathname: pathname + '/' + id.toString(),
                } }>
                    <span className="hover:underline">Перейти</span>
                    <IconButton size="small" title="Open">
                        <OpenWithTwoTone />
                    </IconButton>
                </Link>
            </CardActions>
        </Card>
    )
}