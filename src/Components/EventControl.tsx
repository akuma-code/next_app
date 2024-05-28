'use client'
import { EventDatePicker } from "@/ClientComponents/EventDatePicker";
import { _formated_date } from "@/Helpers/dateFuncs";
import { _log } from "@/Helpers/helpersFns";
import { EventContext } from "@/Hooks/useEventContext";
import { createEvent } from "@/Services/eventService";
import { Button, ButtonGroup, Grid, Stack } from "@mui/material";
import dayjs from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { BaseEvent, EventBlank } from "./EventView/EventBlank";

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
    const [edate, setDate] = useState<string>(() => _formated_date(dayjs()))
    const initEventState = {
        players: [],
        date_formated: edate,
        title: "Тренировка"
    }
    const router = useRouter()
    const pathname = usePathname()
    const search = useSearchParams()
    const selectedDate = search.get('date')
    const [isPending, setPending] = useState(false)
    const [blankEvent, setBlankEvent] = useState<BaseEvent | null>(event || initEventState)



    const handleCreateEvent = async () => {
        setPending(true)
        if (blankEvent && blankEvent.players) {

            const ids = blankEvent?.players.map(p => ({ id: p.id }))
            const data = { event_date: edate, ids }
            try {

                const new_event = await createEvent({ ...data })
                _log(new_event)
                setBlankEvent(null)
                return new_event
            } catch (error) {
                _log(error)
            } finally {
                setPending(false)
            }
        }
    }
    const addEvent = () => {

        setBlankEvent({ date_formated: edate, players: [] })
    }
    const deleteEvent = () => {
        setBlankEvent(initEventState)
    }
    const addPlayers = (pls: IPlayer[], date: string) => {
        setDate(date)
        blankEvent
            ? setBlankEvent(prev => ({ ...prev, players: pls, date_formated: date }))
            : setBlankEvent({ date_formated: date, players: pls })
    }

    const status: DateStatus = useMemo(() => event || blankEvent ? 'hasEvent' : 'free', [event, blankEvent])
    // useEffect(() => {
    //     setBlankEvent(event || null)
    // }, [event, status])
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
                        <EventDatePicker event_date={ selectedDate || edate } />
                        <ButtonGroup fullWidth>

                            <Button disabled={ status === 'free' || isPending }
                                color="error"
                                variant="contained"
                                onClick={ handleCreateEvent }
                            >
                                Сохранить

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
                    { status === 'hasEvent' &&
                        < EventBlank getSelectedPlayers={ addPlayers } event={ event } />
                    }

                    {/* { event && <EventView event={ event } boxProps={ { mt: 0, } } readonly={ false } /> } */ }
                </Grid>
            </Grid>
        </EventContext.Provider>
    );
}
EventControl.displayName = "_______EventsController"
export default EventControl;
/* <PlayerSelector options={ options.names } event_p_names={ activePlayers.map(p => p.name) } /> */