'use client';
import { OpenWithTwoTone } from "@mui/icons-material";
import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DayOfWeek } from "@/Helpers/dateFuncs";
import { IEvent_Front, avatarColor } from "./EventsList";


export const EventCardOldVariant: React.FC<{ event: IEvent_Front; }> = ({ event }) => {

    const { id, date_formated, title = 'Avangard', players } = event;
    const pathname = usePathname();

    const d = date_formated.replaceAll("_", ".");


    const dayWeek = dayjs(d, 'DD.MM.YYYY', 'ru').weekday();


    // _log(stringToColor('8'))
    return (
        <Card sx={ { maxWidth: 150, m: 0.4 } } square={ false }>
            <CardHeader
                title={ d }
                subheader={ DayOfWeek[dayWeek] }
                subheaderTypographyProps={ { textAlign: 'right' } }
                titleTypographyProps={ { fontSize: 20, textAlign: 'center' } }
                sx={ { pb: 0, my: 0 } } />
            <CardContent component={ Stack } rowGap={ 0.5 } sx={ { px: 1, my: 0, py: 0.4 } } alignItems={ 'center' }>



                <Stack direction={ 'row' } spacing={ 1 }>
                    <Typography variant="body1">Игроков: </Typography>
                    <Avatar variant="circular" alt={ title || "" } sizes="small"
                        sx={ { width: 28, height: 28, bgcolor: avatarColor(players.length), fontSize: 16 } }
                    >
                        { players.length }
                    </Avatar>


                </Stack>
            </CardContent>
            <CardActions disableSpacing sx={ { py: 0, my: 0, justifyContent: 'end' } }>
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
    );
};
