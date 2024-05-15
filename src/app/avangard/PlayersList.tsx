'use client'
import { List, ListItem, ListItemButton, Paper, Stack } from "@mui/material";

interface PlayersListProps {
    players: {
        id: number;
        name: string;
    }[];
    title?: React.ReactNode
}
export const PlayersList: React.FC<PlayersListProps> = ({ players, title }) => {

    return (
        <Stack direction={ 'column' } p={ 2 } component={ Paper } elevation={ 1 } m={ 1 }>
            { title }
            <List >
                { players.length > 0 ?
                    players.map(p =>
                        <ListItem key={ p.id }
                            disablePadding
                            dense
                        >
                            <ListItemButton>
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
