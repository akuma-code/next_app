'use client'
import { List, ListItem, ListItemButton } from "@mui/material";

interface PlayersListProps {
    players: {
        id: number;
        name: string;
    }[];

}
export const PlayersList: React.FC<PlayersListProps> = ({ players }) => {

    return (
        <List sx={ { p: 2 } }>
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
    )
};
