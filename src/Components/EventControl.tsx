'use client'
import { EventDatePicker } from "@/ClientComponents/EventDatePicker";
import { EventContext } from "@/Hooks/useEventContext";
import { useToggle } from "@/Hooks/useToggle";
import { Button, ButtonGroup, Grid, Stack } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { BaseEvent, EventBlank } from "./EventView/EventBlank";
import { _formated_date } from "@/Helpers/dateFuncs";
import dayjs from "dayjs";
import { _log } from "@/Helpers/helpersFns";
import { EventView } from "./EventView/EventView";
import { createEvent } from "@/Services/eventService";

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
type DateStatus = 'free' | 'hasEvent'

const EventControl: React.FunctionComponent<EventControlProps> = ({ allPlayers, event }) => {
    const router = useRouter()
    const pathname = usePathname()
    const search = useSearchParams()

    const [edate, setDate] = useState<string>(() => _formated_date(dayjs()))
    const [isShow, show] = useToggle(false)
    const [blankEvent, setBlankEvent] = useState<BaseEvent | null>(null)


    const handleCreateEvent = async () => {

        if (blankEvent && blankEvent.players) {

            const ids = blankEvent?.players.map(p => ({ id: p.id }))
            const data = { event_date: edate, ids }
            try {

                await createEvent({ ...data })
            } catch (error) {
                _log(error)
            }
        }
    }
    const addEvent = () => {
        setBlankEvent({ date_formated: edate })
    }
    const deleteEvent = () => {
        setBlankEvent(null)
    }
    const addPlayers = (pls: IPlayer[]) => {
        blankEvent
            ? setBlankEvent(prev => ({ ...prev, players: pls, date_formated: edate }))
            : setBlankEvent({ date_formated: edate, players: pls })
    }

    const status: DateStatus = useMemo(() => event || blankEvent ? 'hasEvent' : 'free', [event, blankEvent])

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

                            <Button disabled={ status === 'free' }
                                color="error"
                                variant="contained"
                                onClick={ handleCreateEvent }
                            >
                                Создать

                            </Button>

                            <Button
                                disabled={ status === 'hasEvent' }
                                variant="contained"
                                onClick={ addEvent }
                            >

                                Добавить
                            </Button>
                            <Button
                                disabled={ status === 'free' }
                                variant="outlined"
                                onClick={ deleteEvent }

                            >
                                Отмена
                            </Button>

                        </ButtonGroup>
                    </Stack>
                </Grid>
                <Grid item md={ 5 } xs={ 'auto' }>

                    { (blankEvent || event) && <EventBlank getSelectedPlayers={ addPlayers } /> }
                    { event && <EventView event={ event } boxProps={ { mt: 0, } } readonly={ false } /> }
                </Grid>
            </Grid>
        </EventContext.Provider>
    );
}
EventControl.displayName = "_______EventsController"
export default EventControl;
/* <PlayerSelector options={ options.names } event_p_names={ activePlayers.map(p => p.name) } /> */