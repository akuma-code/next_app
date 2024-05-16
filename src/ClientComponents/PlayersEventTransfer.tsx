'use client'
import { _djs } from "@/Helpers/dateFuncs"
import { createEvent } from "@/Services/eventService"
import { PlayerWithInfo } from "@/Services/playerService"
import { CloseTwoTone } from "@mui/icons-material"
import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardActions,
    CardContent,
    Checkbox,
    FormControl,
    FormLabel,
    Grow,
    IconButton,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    Stack,
    Typography
} from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import dayjs, { type Dayjs } from "dayjs"
import { useMemo, useState } from "react"


type CreateEventPayload = {
    event_date: string,
    ids: { id: number }[]
}
type PlayersTransferProps = {
    dbPlayers: PlayerWithInfo[]
}

const today = dayjs()
export const PlayersEventTranfer: React.FC<PlayersTransferProps> = ({ dbPlayers }) => {


    const options = useMemo(() => dbPlayers.map(p => ({ id: p.id, name: p.name })), [])
    const [eventDate, setEventDate] = useState<Dayjs | null>(today)
    const [names, setNames] = useState<string[]>([])
    const selected = useMemo(() => dbPlayers.filter(i => names.includes(i.name)), [names])




    const handleCreate = async () => {
        // event.preventDefault()
        const ids = selected.map(p => ({ id: p.id }))
        const payload: CreateEventPayload = {
            event_date: _djs(eventDate),
            ids: ids
        }


        // console.log('data: ', payload)
        const new_event = createEvent.bind(null, payload)
        await new_event()
        setNames([])

    }
    const handleChange = (event: SelectChangeEvent<string[]>) => {
        let { value } = event.target
        const v = typeof value === 'string' ? value.split(', ') : value
        setNames(v)

    }
    return (
        <>
            <Stack direction={ { sm: 'row', xs: 'column' } } gap={ 2 } p={ 2 } justifyContent={ 'space-between' } >


                <Stack spacing={ 2 }>
                    <DatePicker
                        name="date"
                        value={ eventDate }
                        onChange={ v => setEventDate(v) }

                    />
                    <FormControl >
                        <FormLabel id="name-selector-label">
                            <Typography variant="body1" textAlign={ 'right' }>

                                Присутствуют на тренировке:
                            </Typography>
                        </FormLabel>

                        <Select
                            labelId="name-selector-label"
                            autoFocus={ false }
                            name="names"
                            id="name-selector"
                            value={ names }
                            onChange={ handleChange }
                            multiple
                            renderValue={ (n) => {
                                const text = n.length > 0 ? `Выбрано: ${n.length}` : "players"
                                return (<Box textAlign={ 'center' }>{ text }</Box>)
                            } }
                            variant="outlined"
                            placeholder="asd"

                            input={
                                <OutlinedInput
                                    placeholder="players"
                                    name="names2"
                                    startAdornment={
                                        <IconButton onClick={ () => setNames([]) }>
                                            { names.length > 0 && <CloseTwoTone /> }
                                        </IconButton> } />
                            }

                        >


                            {
                                options.map(p =>
                                    <MenuItem
                                        key={ p.name }
                                        value={ p.name } >
                                        <ListItemText
                                            primary={ p.name }
                                            primaryTypographyProps={ { textAlign: 'left' } }
                                        />
                                        <Checkbox checked={ names.includes(p.name) } />
                                    </MenuItem>
                                )
                            }
                        </Select>
                        {/* <FormHelperText>Players</FormHelperText> */ }
                    </FormControl>


                </Stack>



                { selected.length > 0 &&
                    <Grow in={ selected.length > 0 } timeout={ 800 }>


                        <Card sx={ { minWidth: 200, px: 1 } }>

                            <Typography variant="h6" component={ Stack } direction={ 'row' } justifyContent={ 'space-evenly' } useFlexGap>
                                <b> { eventDate?.format('DD.MM.YY') }</b>

                            </Typography>


                            <CardContent >

                                <List >

                                    { selected.map((p, i) =>
                                        <ListItem key={ p.id }
                                            disablePadding
                                            dense
                                        // sx={ { width: 'max-content' } }
                                        >
                                            <ListItemText
                                                primary={ `${i + 1}) ${p.name}` }
                                                primaryTypographyProps={ { marginInlineStart: 2, textAlign: 'left' } }
                                                // secondary={ `id: ${p.id} rate: ${p.PlayerInfo?.rttf_score}` }
                                                secondaryTypographyProps={ { textAlign: 'right' } }
                                            />


                                        </ListItem>
                                    )
                                    }

                                </List>
                            </CardContent>
                            <CardActions >
                                <ButtonGroup>

                                    <Button
                                        size={ 'small' }
                                        onClick={ handleCreate }
                                        type="submit"
                                        variant="contained"
                                        sx={ { flexGrow: 0, alignSelf: 'flex-start' } }>
                                        Подтвердить
                                    </Button>
                                    <Button
                                        size={ 'small' }

                                        variant="contained"
                                        color="error"
                                        sx={ { flexGrow: 0, alignSelf: 'flex-start' } }
                                        onClick={ () => setNames([]) }>
                                        Очистить
                                    </Button>
                                </ButtonGroup>
                            </CardActions>
                        </Card>
                    </Grow>
                }






            </Stack >

        </>
    )
}

PlayersEventTranfer.displayName = '_____PlayersTransferList'