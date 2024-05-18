'use client'

import { _log } from "@/Helpers/helpersFns";
import { stringToColor } from "@/Helpers/stringToColor";
import { OpenInFullTwoTone, OpenWithTwoTone } from "@mui/icons-material";
import { Avatar, Box, Card, CardActions, CardContent, IconButton, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
const mockEvents = [
    {
        id: 1,
        date_formated: '17_05_24',
        players: [
            {
                id: 1,
                name: 'player1'
            },
            {
                id: 2,
                name: 'player2'
            },
            {
                id: 3,
                name: 'player3'
            },
            {
                id: 4,
                name: 'player4'
            },
        ]
    },
    {
        id: 2,
        date_formated: '19_05_24',
        players: [
            {
                id: 11,
                name: 'player11'
            },
            {
                id: 22,
                name: 'player22'
            },

        ]
    },
    {
        id: 3,
        date_formated: '21_05_24',
        players: [
            {
                id: 13,
                name: 'player13'
            },

            {
                id: 33,
                name: 'player33'
            },
            {
                id: 43,
                name: 'player43'
            },
        ]
    },


]


export const EventsList: React.FC<{ events?: IEvent_Front[] }> = ({ events = mockEvents }: { events?: IEvent_Front[] }) => {



    return (
        <Stack flexWrap={ 'wrap' } maxWidth={ 400 } direction={ 'row' } rowGap={ 1 } columnGap={ 2 }>
            { events.map(e =>
                <EventCard
                    key={ e.id }
                    event={ e }
                />

            ) }
        </Stack>
    )
}

export const EventCard: React.FC<{ event: IEvent_Front }> = ({ event }) => {

    const { id, date_formated, title = 'Avangard', players } = event
    const pathname = usePathname()

    const d = date_formated.replaceAll("_", "/")
    // _log(stringToColor('8'))
    return (
        <Card sx={ { maxWidth: 120 } }>
            <CardContent component={ Stack } gap={ 0 } sx={ { p: 1, my: 0 } }>

                <Typography
                    variant="button"
                    component={ 'div' }
                    textAlign={ 'center' }>
                    { d }


                </Typography>
                <Stack direction={ 'row' } spacing={ 1 }>
                    <Typography variant="body1">Игроков: </Typography>
                    <Avatar variant="circular" alt={ title } sizes="small"
                        sx={ { width: 24, height: 24, bgcolor: stringToColor(players.length.toString()) } }
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