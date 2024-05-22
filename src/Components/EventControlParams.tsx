'use client'
import { EventDatePicker } from "@/ClientComponents/EventDatePicker";
import { EventContext } from "@/Hooks/useEventContext";
import { useToggle } from "@/Hooks/useToggle";
import { Avatar, Box, Button, ButtonGroup, Checkbox, FormControl, FormLabel, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, MenuItem, OutlinedInput, Paper, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { BaseEvent, EventBlank } from "./EventView/EventBlank";
import { _formated_date } from "@/Helpers/dateFuncs";
import dayjs, { Dayjs } from "dayjs";
import { _log } from "@/Helpers/helpersFns";
import { EventView } from "./EventView/EventView";
import { createEvent } from "@/Services/eventService";
import { name_letters } from "@/Helpers/stringFns";
import { CloseTwoTone } from "@mui/icons-material";
import DoNotDisturbOnTwoToneIcon from '@mui/icons-material/DoNotDisturbOnTwoTone';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import { DatePicker } from "@mui/x-date-pickers";
interface IPlayer {
    id: number;
    name: string;
}
export interface ExistEvent extends BaseEvent {
    id: number
    players: IPlayer[]
}
interface EventControlProps {
    event?: {
        id: number;
        date_formated: string;
        players: IPlayer[];
        title?: string | null | undefined;

    } | null
    allPlayers: IPlayer[]
    params: { date: string }
}
interface EventState {
    id?: number;
    players: IPlayer[];
    date_formated: string;
    title?: string | null
    status?: EventStatus
}
type EventStatus = 'onEdit' | 'onCreate' | 'idle' | 'ready'
type DateStatus = 'free' | 'hasEvent'
const EventControlParam: React.FunctionComponent<EventControlProps> = ({ allPlayers, event, params }) => {
    const initEventState: EventState = {
        players: [], date_formated: params.date, title: "Тренировка", status: 'idle'
    }
    const [pickerDate, setPickerDate] = useState<Dayjs | null>(() => dayjs(params.date, "DD_MM_YYYY"))

    const [isPending, setPending] = useState(false)
    const preselect = event && event.players.length > 0 ? event.players.map(p => p.id) : []
    const [selected, setSelected] = useState<number[]>(() => preselect)
    const [eventState, setEvent] = useState<EventState>(event || initEventState)
    const changeStatus = (s: EventStatus) => setEvent(prev => ({ ...prev, status: s }))



    const date = _formated_date(pickerDate)

    // if (event) {
    //     // if (eventState.status !== 'idle') return
    //     // changeStatus('onEdit')
    //     setEvent(prev => ({ ...prev, id: event.id }))
    // }
    const router = useRouter()
    const pathname = usePathname()
    // const search = useSearchParams()


    const handleCreateEvent = async () => {
        setPending(true)
        if (eventState.status !== 'ready') return _log("Status Error, check event state")
        // changeStatus('onCreate')

        try {

            const new_event = await createEvent({
                event_date: eventState.date_formated,
                ids: eventState.players
            })

            _log(new_event)

            return new_event
        } catch (error) {
            _log(error)
        } finally {
            changeStatus("onEdit")
            setPending(false)
        }
    }

    const deleteEvent = () => {
        setEvent(initEventState)
    }

    const handleSelect = (event: SelectChangeEvent<number[]>) => {
        let { value } = event.target;
        const v = typeof value === 'string' ? value.split(', ').map(Number) : value;
        setSelected(v);

    }


    const selectedPlayers = useMemo(() => {

        const select = allPlayers.filter(p => selected.includes(p.id))
        return select
    }, [selected])


    function handleRemove(player: IPlayer) {
        setSelected(prev => prev.filter(p => player.id !== p))
    }
    const handleApply = () => {
        setEvent(prev => ({ ...prev, players: selectedPlayers, date_formated: date }))
        changeStatus('ready')


    }

    const handleClear = () => {

        _log("removed: ", selected.length)
        // getSelectedPlayers([], date)
        setSelected([])
    }
    // const status: DateStatus = useMemo(() => event ? 'hasEvent' : 'free', [event])

    return (


        <Grid container spacing={ 2 } maxWidth={ { xs: 300, md: 400, lg: 600 } } justifyContent={ 'center' } direction={ 'column' }>
            <Grid item xs={ 'auto' } md={ 3 }>

                <Stack direction={ { sm: 'column' } } gap={ 2 }>
                    {/* <EventDatePicker event_date={ selectedDate || date } /> */ }
                    <DatePicker
                        name="date"
                        value={ pickerDate }
                        onChange={ setPickerDate }
                        slotProps={ {
                            textField: { size: 'small', },

                        } }
                    />
                    <ButtonGroup fullWidth>

                        <Button disabled={ isPending }
                            color="error"
                            variant="contained"
                            onClick={ handleCreateEvent }
                        >
                            Сохранить

                        </Button>

                        {/* <Button
                            disabled={ status === 'hasEvent' }
                            variant="contained"
                            onClick={ addEvent }
                        >

                            Добавить
                        </Button> */}
                        <Button
                            disabled={ isPending }
                            variant="outlined"
                            onClick={ handleClear }

                        >
                            Отмена
                        </Button>

                    </ButtonGroup>
                    <TextField
                        name='title'
                        value={ eventState.title }
                        onChange={ (e) => setEvent(prev => ({ ...prev, title: e.target.value })) }
                        variant="filled"
                        size="small"
                    />
                </Stack>
            </Grid>
            <Grid item md={ 5 } xs={ 'auto' }>
                {
                    //  status === 'hasEvent' &&
                    <Paper elevation={ 2 } sx={ { maxWidth: 350 } }>
                        <Stack gap={ 2 } direction={ { sm: 'column' } } p={ 2 } mx={ 2 }>
                            <Box display={ 'flex' } flexDirection={ 'row' } justifyContent={ 'space-between' }>

                                <Typography >{ eventState.title }   </Typography>
                                <Typography > status: { eventState.status } </Typography>
                            </Box>
                            <Typography> </Typography>

                            <Stack direction={ 'row' } gap={ 1 } alignItems={ 'end' }>

                                <FormControl sx={ { minWidth: 280 } }>
                                    <FormLabel id="name-selector-label">
                                        <Typography variant="body1" textAlign={ 'right' }>
                                            Добавить игроков:
                                        </Typography>
                                    </FormLabel>

                                    <Select
                                        fullWidth
                                        labelId="name-selector-label"
                                        autoFocus={ false }
                                        name="names"
                                        id="name-selector"
                                        value={ selected }
                                        onChange={ handleSelect }
                                        multiple
                                        renderValue={ (n) => {
                                            const text = n?.length > 0 ? `Выбрано: ${n.length}` : "players";
                                            return (
                                                <Button variant={ 'text' }>

                                                    { text }
                                                </Button>

                                            );
                                        } }
                                        variant="outlined"

                                        size="small"
                                        input={ <OutlinedInput
                                            fullWidth
                                            name="names2"
                                            startAdornment={
                                                <Box sx={ { mr: 2, pr: 1 } } display={ 'flex' } flexDirection={ 'row' }>
                                                    { selected.length > 0 &&
                                                        <>
                                                            <IconButton
                                                                title="Сохранить" edge={ 'end' } color="success" sx={ { border: '1px solid', mr: 1, ml: 0 } } size="small"
                                                                onClick={ handleApply }>
                                                                <CheckCircleTwoToneIcon />
                                                            </IconButton>
                                                            <IconButton
                                                                title="Очистить" edge={ 'end' } color='error' sx={ { border: '1px solid', mr: 1 } } size="small"
                                                                onClick={ handleClear }>
                                                                <CloseTwoTone />
                                                            </IconButton>
                                                        </>
                                                    }
                                                </Box>
                                            }

                                        />
                                        }

                                    >


                                        { allPlayers.map(p =>
                                            <MenuItem
                                                key={ p.id }
                                                value={ p.id }>
                                                <ListItemText
                                                    primary={ p.name }
                                                    primaryTypographyProps={ { textAlign: 'left' } }
                                                // onClick={ () => handlePlayersListChange(p) }
                                                />
                                                <Checkbox checked={ selected.includes(p.id) } />
                                            </MenuItem>
                                        ) }
                                    </Select>
                                </FormControl>
                                {/* <Button size="medium" variant="contained" color='success'
                        onClick={ () => props.getSelectedPlayers(selectedPlayers) }
                    >
                        <SvgIcon>
                            <CheckCircleTwoToneIcon />
                        </SvgIcon>
                    </Button> */}


                            </Stack>
                            <List>
                                <Paper variant="outlined">

                                    {
                                        selectedPlayers.map((p, index) => (
                                            <ListItem key={ p.id } sx={ { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' } }>
                                                <ListItemAvatar >
                                                    <Avatar sizes="sm">{ name_letters(p.name) }</Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={ p.name } />

                                                <IconButton edge={ 'end' } onClick={ () => handleRemove(p) }>
                                                    <DoNotDisturbOnTwoToneIcon sx={ { width: 28, height: 28 } } />
                                                </IconButton>

                                            </ListItem>
                                        ))
                                    }
                                </Paper>
                            </List>

                        </Stack>
                    </Paper>
                }

                {/* { event && <EventView event={ event } boxProps={ { mt: 0, } } readonly={ false } /> } */ }
            </Grid>
        </Grid>

    );
}
EventControlParam.displayName = "_______EventsParamsController"
export default EventControlParam;
/* <PlayerSelector options={ options.names } event_p_names={ activePlayers.map(p => p.name) } /> */