'use client'

import { PlayerSelector } from "@/ClientComponents/PlayerSelector";
import { name_letters } from "@/Helpers/stringFns";
import { useEventContext } from "@/Hooks/useEventContext";
import { Avatar, Box, Button, ButtonGroup, Checkbox, FormControl, FormLabel, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, MenuItem, OutlinedInput, Paper, Select, SelectChangeEvent, Stack, SvgIcon, Typography } from "@mui/material"
import { useMemo, useState } from "react"
import DoNotDisturbOnTwoToneIcon from '@mui/icons-material/DoNotDisturbOnTwoTone';

import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import { CloseTwoTone } from "@mui/icons-material";
import { _log } from "@/Helpers/helpersFns";
import { useSearchParams } from "next/navigation";
export interface BaseEvent {

    date_formated: string;
    players?: IPlayer[]
    title?: string | null
}

export interface ExistEvent extends BaseEvent {
    id: number
    players: IPlayer[]
}
export interface IPlayer {
    id: number;
    name: string;
}

export type HandleSelectPlayers = (players: IPlayer[], date: string) => void
interface EventCreateProps {
    getSelectedPlayers: HandleSelectPlayers;
    event?: ExistEvent | null
}

export const EventBlank: React.FC<EventCreateProps> = (props) => {
    const { event, getSelectedPlayers } = props
    const init_players_ids = event ? event.players.map(p => p.id) : []
    const { players, activeEvent } = useEventContext()
    const q = useSearchParams()
    const date = q.get('date')
    const [selected, setSelected] = useState<number[]>(init_players_ids)


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
    const handleApply = () => {
        if (!date) return _log("Search date invalid")
        else {
            _log("added: ", selectedPlayers.length)

            getSelectedPlayers(selectedPlayers, date)
        }
    }

    const handleClear = () => {
        if (!date) return _log("Search date invalid")
        _log("removed: ", selected.length)
        getSelectedPlayers([], date)
        setSelected([])
    }
    return (
        <Paper elevation={ 2 } sx={ { maxWidth: 350 } }>
            <Stack gap={ 2 } direction={ { sm: 'column' } } p={ 2 } mx={ 2 }>
                <Typography>{ event ? event.title : "New Event" } </Typography>
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


                            { players.map(p =>
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
    )
}


const InputButtons = ({ ids }: { ids?: number[] }) => {

    return (
        <ButtonGroup variant="outlined" fullWidth>
            <IconButton><CheckCircleTwoToneIcon /></IconButton>
            <IconButton> <CloseTwoTone /></IconButton>
        </ButtonGroup>)
}

EventBlank.displayName = "____Event Blank"