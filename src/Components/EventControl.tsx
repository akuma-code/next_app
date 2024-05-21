'use client'
import { EventDatePicker } from "@/ClientComponents/EventDatePicker";
import { EventContext } from "@/Hooks/useEventContext";
import { useToggle } from "@/Hooks/useToggle";
import { Button, ButtonGroup, Grid, Stack } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { BaseEvent, EventBlank } from "./EventView/EventBlank";
import { _formated_date } from "@/Helpers/dateFuncs";
import dayjs from "dayjs";
import { _log } from "@/Helpers/helpersFns";

interface IPlayer {
    id: number;
    name: string;
}

interface EventControlProps {
    event?: {
        id: number;
        date_formated: string;
        players: IPlayer[];
        title?: string | null | undefined;
        _count?: { players: number }
    } | null
    allPlayers: IPlayer[]
}

type EventStatus = 'onActive' | 'onCreate' | 'idle'

const EventControl: React.FunctionComponent<EventControlProps> = ({ allPlayers, event }) => {
    const router = useRouter()
    const pathname = usePathname()
    const search = useSearchParams()

    const [edate, setDate] = useState<string>(() => _formated_date(dayjs()))
    const [isShow, show] = useToggle(false)
    const [blankEvent, setBlankEvent] = useState<BaseEvent | null>(null)

    const handleChangeQuery = (date?: string) => {
        router.push(pathname + '?date=' + date)
    }
    const handleSaveEvent = (date: string) => {
        if (!blankEvent) return setBlankEvent({ date_formated: date, })
        setBlankEvent(prev => ({ ...prev, date_formated: date }))
    }

    const isEventExis = event || !isShow
    const status: EventStatus = event ? 'onActive' : (blankEvent || isShow) ? 'onCreate' : "idle"
    _log(status)
    return (
        <EventContext.Provider
            value={ {
                players: allPlayers,
                setDate, date: edate,
                activeEvent: event,
                new_event: blankEvent,
                create_newEvent: setBlankEvent
            } }>

            <Grid container spacing={ 2 } maxWidth={ { xs: 300, md: 400, lg: 600 } } justifyContent={ 'center' } direction={ 'column' }>
                <Grid item xs={ 'auto' } md={ 3 }>

                    <Stack direction={ { sm: 'column' } } gap={ 2 }>
                        <EventDatePicker event_date={ event?.date_formated } />
                        <ButtonGroup fullWidth>

                            <Button disabled={ status === 'idle' }
                                color="error"
                                variant="contained"
                                onClick={ () => handleSaveEvent(edate) }
                            >
                                Сохранить

                            </Button>

                            <Button
                                disabled={ status !== 'idle' }
                                variant="outlined"
                                onClick={ show.toggle }
                            >

                                Добавить
                            </Button>
                            <Button
                                disabled={ status !== 'onCreate' }
                                variant="outlined"
                                onClick={ show.toggle }

                            >
                                Отмена
                            </Button>

                        </ButtonGroup>
                    </Stack>
                </Grid>
                <Grid item md={ 5 } xs={ 'auto' }>

                    {
                        !isEventExis &&

                        <EventBlank /> }
                </Grid>
            </Grid>
        </EventContext.Provider>
    );
}
EventControl.displayName = "_______EventsController"
export default EventControl;
/* <PlayerSelector options={ options.names } event_p_names={ activePlayers.map(p => p.name) } /> */