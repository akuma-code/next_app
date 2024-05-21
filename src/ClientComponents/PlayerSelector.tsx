'use client';
import { useEventContext } from "@/Hooks/useEventContext";
import { CloseTwoTone } from "@mui/icons-material";
import {
    Box, Checkbox,
    FormControl,
    FormLabel, IconButton, ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent, Typography
} from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";


interface PlayerSelectorProps {
    event_p_names?: string[],

    options: string[]
}
export function PlayerSelector({ options }: PlayerSelectorProps) {
    const [selected, setSelected] = useState<string[]>([])
    const { create_newEvent } = useEventContext()

    // const [rest, setRest] = useState(options.filter(o => !selected.includes(o)))

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        let { value } = event.target;
        const v = typeof value === 'string' ? value.split(', ') : value;
        setSelected(prev => v);

    };

    // useEffect(() => {
    //     if (!event_p_names) return setRest(options)
    //     setRest(prev => prev.filter(p => event_p_names.includes(p)))
    // }, [event_p_names])
    return (
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
                onChange={ handleChange }
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
                    startAdornment={ <IconButton onClick={ () => { setSelected && setSelected([]) } }>
                        { selected.length > 0 && <CloseTwoTone /> }
                    </IconButton> } /> }

            >


                { options.map(p => <MenuItem
                    key={ p }
                    value={ p }>
                    <ListItemText
                        primary={ p }
                        primaryTypographyProps={ { textAlign: 'left' } } />
                    <Checkbox checked={ selected.includes(p) } />
                </MenuItem>
                ) }
            </Select>
            {/* <FormHelperText>Players</FormHelperText> */ }
        </FormControl>
    );
}
