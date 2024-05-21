'use client'
import AdeptusMechanicus from "@/Components/Icons/AdeptusMechanicus"
import { _djs, _formated_date } from "@/Helpers/dateFuncs"
import { createEvent } from "@/Services/eventService"
import { PlayerWithInfo } from "@/Services/playerService"
import {
    Button,
    ButtonGroup,
    Card,
    CardActions,
    CardContent,
    Grow,
    List,
    ListItem,
    ListItemText,
    Stack,
    Typography
} from "@mui/material"
import dayjs, { type Dayjs } from "dayjs"
import { usePathname, useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { PlayerSelector } from "./PlayerSelector"
import { EventDatePicker } from "./EventDatePicker"


type CreateEventPayload = {
    event_date: string,
    ids: { id: number }[]
}
type PlayersTransferProps = {
    dbPlayers: { id: number, name: string }[]
    evPlayers: { id: number, name: string }[]
}

const today = dayjs()
export const PlayersEventTranfer: React.FC<PlayersTransferProps> = ({ dbPlayers, evPlayers }) => {


    const [eventDate, setEventDate] = useState<Dayjs>(today)
    const [names, setNames] = useState<string[]>(() => dbPlayers.map(p => p.name) || [])
    const selected = useMemo(() => evPlayers.filter(i => names.includes(i.name)), [names])

    const options = useMemo(() => evPlayers.map(p => p.name), [])
    const router = useRouter()
    const pathname = usePathname()

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
        // setNames([])

    }

    const onDateChange = (v: string | null) => {
        router.push(pathname + '?date=' + _formated_date(v))
        setEventDate(dayjs(v))
    }
    return (
        <>
            <Stack direction={ { sm: 'row', xs: 'column' } } gap={ 2 } p={ 2 } justifyContent={ 'space-between' } >


                <Stack spacing={ 2 }>
                    { EventDatePicker({ event_date: _formated_date(eventDate), changeHandler: onDateChange }) }
                    { PlayerSelector({ event_p_names: names, options }) }


                </Stack>



                { selected.length > 0 &&
                    <Grow in={ selected.length > 0 } timeout={ 800 }>


                        <Card sx={ { minWidth: 200, px: 1 } }>

                            <Typography variant="h6" component={ Stack } direction={ 'row' } justifyContent={ 'space-evenly' } useFlexGap>
                                <b> { _formated_date(eventDate) }</b>

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

