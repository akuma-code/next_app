'use client'
import { List, ListItem, ListItemButton, Paper, Stack } from "@mui/material";
import { useState } from "react";

interface PlayersListProps {
    players: {
        id: number;
        name: string;
    }[];
    title?: React.ReactNode
    getSelected?: (ids: number[]) => void
}
export const PlayersList: React.FC<PlayersListProps> = ({ players, title, getSelected }) => {
    const [group, setGroup] = useState<number[]>([])
    const isInGroup = (id: number) => group.includes(id)
    const handleSelect = (id: number) => {
        if (isInGroup(id)) {
            setGroup(prev => prev.filter(p => p !== id))
        }
        else {
            setGroup(prev => ([...prev, id]))
            if (getSelected) getSelected(group)
        }
    }
    return (
        <Stack direction={ 'column' } p={ 2 } component={ Paper } elevation={ 1 } m={ 1 }>
            { title }
            <List >
                { players.length > 0 ?
                    players.map(p =>
                        <ListItem key={ p.id }
                            disablePadding
                            dense
                            sx={ {
                                bgcolor: isInGroup(p.id) ? "beige" : 'inherit'
                            } }
                        >
                            <ListItemButton
                                selected={ isInGroup(p.id) }
                                onClick={ () => handleSelect(p.id) }>
                                { p.name }
                            </ListItemButton>
                        </ListItem>
                    )
                    :
                    <ListItem>
                        List is empty
                    </ListItem>
                }
            </List>
        </Stack>
    )
};
