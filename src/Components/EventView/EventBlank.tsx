'use client'

import { PlayerSelector } from "@/ClientComponents/PlayerSelector";
import { name_letters } from "@/Helpers/stringFns";
import { useEventContext } from "@/Hooks/useEventContext";
import { Avatar, Box, Checkbox, FormControl, FormLabel, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, MenuItem, OutlinedInput, Paper, Select, SelectChangeEvent, Stack, Typography } from "@mui/material"
import { useMemo, useState } from "react"
import DoNotDisturbOnTwoToneIcon from '@mui/icons-material/DoNotDisturbOnTwoTone';
import { CloseTwoTone } from "@mui/icons-material";
export interface BaseEvent {
    id?: number;
    date_formated: string;
    title?: string | null
}
export interface IPlayer {
    id: number;
    name: string;
}
export const EventBlank: React.FC = () => {
    const { players, date, activeEvent } = useEventContext()

    const [event, setEvent] = useState<BaseEvent | null>(null)
    const [eventPlayers, setEP] = useState<IPlayer[]>([])
    const [selected, setSelected] = useState<number[]>([])
    const handleSelect = (event: SelectChangeEvent<number[]>) => {
        let { value } = event.target;
        const v = typeof value === 'string' ? value.split(', ').map(Number) : value;
        setSelected(v);

    }
    const selectedPlayers = useMemo(() => {
        const select = players.filter(p => selected.includes(p.id))
        return select
    }, [selected])
    function handleRemove(player: IPlayer) {
        setSelected(prev => prev.filter(p => player.id !== p))
    }

    return (
        <Paper elevation={ 2 } sx={ { minWidth: 300 } }>
            <Stack gap={ 2 } direction={ { sm: 'column' } } p={ 2 } mx={ 2 }>

                <FormControl sx={ { minWidth: 200 } }>
                    <FormLabel id="name-selector-label">
                        <Typography variant="body1" textAlign={ 'right' }>
                            Добавить игроков:
                        </Typography>
                    </FormLabel>

                    <Select
                        labelId="name-selector-label"
                        autoFocus={ false }
                        name="names"
                        id="name-selector"
                        value={ selected }
                        onChange={ handleSelect }
                        multiple
                        renderValue={ (n) => {
                            const text = n.length > 0 ? `Выбрано: ${n.length}` : "players";
                            return (<Box textAlign={ 'center' }>{ text }</Box>);
                        } }
                        variant="outlined"
                        placeholder="asd"
                        size="small"
                        input={ <OutlinedInput
                            placeholder="players"
                            name="names2"
                            startAdornment={ <IconButton onClick={ () => { setSelected([]) } }>
                                { selected.length > 0 && <CloseTwoTone /> }
                            </IconButton> } /> }

                    >


                        { players.map(p => <MenuItem
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
                    {/* <FormHelperText>Players</FormHelperText> */ }
                </FormControl>
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
    )
}

EventBlank.displayName = "____Event Blank"