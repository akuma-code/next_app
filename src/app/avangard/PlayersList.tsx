'use client'
import { Grow, List, ListItem, ListItemButton, Paper, Stack } from "@mui/material";
import { useRef, useState } from "react";

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
    const ref = useRef(null)
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
        <Stack direction={ 'column' } p={ 2 } component={ Paper } elevation={ 1 } m={ 1 } ref={ ref }>
            { title }
            <List >
                { players.length > 0 ?
                    players.map(p =>
                        <Grow in={ players.length > 0 } timeout={ 800 } key={ p.id }>

                            <ListItem
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
                        </Grow>
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
