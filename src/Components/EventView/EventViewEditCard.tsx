'use client'

import { IEvent_Front, avatarColor } from "@/ClientComponents/EventsList"
import { _dbDateParser, _formated_date } from "@/Helpers/dateFuncs"
import { _log } from "@/Helpers/helpersFns"
import { name_letters } from "@/Helpers/stringFns"
import { useEventControl } from "@/Hooks/useEvents"
import { useGetAllPlayers } from "@/Hooks/useGetEventPlayers"
import { useToggle } from "@/Hooks/useToggle"
import { deleteEvent, updateEvent } from "@/Services/eventService"
import { SettingsTwoTone } from "@mui/icons-material"
import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, Avatar, Box, Button, ButtonGroup, ButtonTypeMap, Card, CardActionArea, CardActions, CardContent, CardHeader, Checkbox, Chip, Dialog, DialogContent, DialogTitle, ExtendButtonBase, IconButton, IconButtonTypeMap, ListItem, ListItemButton, Stack, TextField } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import { Dayjs } from "dayjs"
import { redirect } from "next/navigation"
import { useRouter } from "next/navigation"
import { ChangeEvent, ReactElement, SyntheticEvent, useMemo, useState } from "react"
import useSWR, { useSWRConfig } from "swr"

interface EditEventCardProps {
    event: IEvent_Front
    buttonVariant?: 'base' | 'icon'
    // ExtendButtonBase<IconButtonTypeMap<{}, "button">>
}

type AcValueChangeHandler = (
    event: SyntheticEvent<Element, Event>,
    value: { id: number; name: string; }[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<{ id: number; name: string }> | undefined
) => void | undefined
export const EventViewEditCard: React.FC<EditEventCardProps> = ({ event, buttonVariant = 'base' }) => {
    const { id, date_formated, players, title } = event
    const [ev, setEvent] = useState(event)
    const r = useRouter()
    const [isChanging, { on, off }] = useToggle(false)
    const [isChanged, change_control] = useToggle()
    const [ac_value, setAcValue] = useState("")
    const [ac_select, setAcSelect] = useState(players)
    const [eventDate, setEventDate] = useState<Dayjs | null>(() => _dbDateParser(date_formated)._dayjs)
    const [all_players, isLoading] = useGetAllPlayers()

    function changeTitleHandler(e: ChangeEvent<HTMLInputElement>) {
        return setEvent(prev => ({ ...prev, title: e.target.value }))
    }
    function handleInputChange(event: SyntheticEvent<Element, Event>, value: string) {
        // change_control.on()
        setAcValue(value)
    }
    const handleAcValueChange: AcValueChangeHandler = (e, new_value, reason, details) => {
        // _log({ reason })
        // _log({ details })
        // change_control.on()
        setAcSelect(prev => new_value)
    }
    const ac_options = useMemo(() => all_players, [all_players])
    const handleSubmitEvent = async () => {
        on()
        const event_data = {
            ...ev,
            players: ac_select,
            date_formated: _formated_date(eventDate),

        }

        _log({ event_data })
        await updateEvent({ id: event_data.id, _new_data: event_data }).finally(() => off())
        r.push('/avangard/events/' + id)

    }

    const handleDelete = async (id: number) => {
        on()
        if (confirm("Delete event?")) {
            await deleteEvent(id).finally(() => off())
            r.push('/avangard/events')

        }
    }
    return (
        <>

            <Card >
                <CardHeader title={ ev.title } subheader={ `Edit Event id: ${id}` } />
                <CardActions

                >
                    <ButtonGroup variant="contained" size="small" component={ Stack } direction={ 'row' } fullWidth>

                        <Button onClick={ handleSubmitEvent } disabled={ isChanging }>
                            Сохранить
                        </Button>
                        <Button onClick={ () => handleDelete(event.id) } disabled={ isChanging }>Удалить</Button>
                        <Button color="info" href={ "/avangard/events/" + id }
                        >
                            Назад

                        </Button>
                    </ButtonGroup>
                </CardActions>

                <CardContent >
                    <Stack rowGap={ 1 } maxWidth={ 300 }>

                        <TextField
                            name="title"
                            value={ ev.title }
                            size="small"
                            onChange={ changeTitleHandler }
                            helperText={ 'Изменить название' }
                        />
                        <DatePicker
                            name="date"
                            value={ eventDate }
                            onChange={ setEventDate }
                            slotProps={ {
                                textField: { size: 'small', helperText: 'изменить дату' }
                            } }
                        />

                        <Autocomplete multiple disableCloseOnSelect forcePopupIcon disableListWrap
                            filterSelectedOptions
                            loading={ isLoading }
                            autoHighlight
                            value={ ac_select }
                            onChange={ handleAcValueChange }
                            inputValue={ ac_value }
                            onInputChange={ handleInputChange }
                            renderInput={ (params) => <TextField { ...params } helperText={ 'Изменить состав' } size="small" /> }
                            options={ ac_options }
                            getOptionLabel={ (option) => option.name }
                            isOptionEqualToValue={ (option, value) => option.id === value.id }
                            renderOption={ (props, option, { selected }) => {
                                const p = props
                                return (
                                    <ListItem key={ option.name } { ...p }
                                        secondaryAction={
                                            <Checkbox
                                                style={ { marginRight: 4, marginLeft: 4 } }
                                                checked={ selected }
                                            />
                                        }

                                    >
                                        <ListItemButton>


                                            { option.name }
                                        </ListItemButton>
                                    </ListItem>)
                            }
                            }
                            limitTags={ 3 }
                        // getLimitTagsText={ (more) => <Avatar sizes="small" sx={ { height: 25, width: 25, fontSize: 14, bgcolor: avatarColor(more) } } >+{ more }</Avatar> }
                        // renderTags={ (selected, getTagProps) => {
                        //     return selected.map((p, index) => {
                        //         const { key, ...rest } = getTagProps({ index })

                        //         const label = name_letters(p.name)
                        //         return (
                        //             <Chip variant="filled" label={ label } { ...rest } key={ p.name } />
                        //         )
                        //     })
                        // }
                        // }
                        />
                    </Stack>
                </CardContent>
            </Card>
        </>
    )
}

EventViewEditCard.displayName = "____EditEventCard"