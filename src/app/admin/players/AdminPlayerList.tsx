'use client'

import DeleteButton from "@/ClientComponents/UI/DeleteButton";
import { PlayerWithInfo } from "@/Services/playerService";
import { EditTwoTone, DeleteTwoTone } from "@mui/icons-material";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Info, Player } from "@prisma/client";
import Link from "next/link";


const AdminPlayerList = ({ players }: { players: PlayerWithInfo[] }) => {
    return (
        <List dense disablePadding>
            {
                players.map((p, idx) =>
                    <ListItem key={ p.id }>
                        <ListItemButton LinkComponent={ Link } href={ `players/${p.id}?action=edit` }>
                            <ListItemText
                                secondaryTypographyProps={ {
                                    ml: 2
                                } }
                                primary={ p.name }
                                secondary={ p.info?.rttf_score && <span> рейтинг: { p.info?.rttf_score }</span> } />
                            <EditTwoTone />
                        </ListItemButton>
                        <ListItemButton color="error">
                            <DeleteButton deleteId={ +p.id }>
                                <DeleteTwoTone />
                            </DeleteButton>
                        </ListItemButton>
                    </ListItem>
                )
            }
        </List>);
}

export default AdminPlayerList