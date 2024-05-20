'use client';
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
import { Dispatch, SetStateAction } from "react";


interface PlayerSelectorProps {
    names: string[],
    setNames?: Dispatch<SetStateAction<string[]>>
    options: string[]
}
export function PlayerSelector({ names, setNames, options }: PlayerSelectorProps) {
    const handleChange = (event: SelectChangeEvent<string[]>) => {
        let { value } = event.target;
        const v = typeof value === 'string' ? value.split(', ') : value;
        setNames && setNames(v);


    };
    return (
        <FormControl>
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
                value={ names }
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
                    startAdornment={ <IconButton onClick={ () => { setNames && setNames([]) } }>
                        { names.length > 0 && <CloseTwoTone /> }
                    </IconButton> } /> }

            >


                { options.map(p => <MenuItem
                    key={ p }
                    value={ p }>
                    <ListItemText
                        primary={ p }
                        primaryTypographyProps={ { textAlign: 'left' } } />
                    <Checkbox checked={ names.includes(p) } />
                </MenuItem>
                ) }
            </Select>
            {/* <FormHelperText>Players</FormHelperText> */ }
        </FormControl>
    );
}
