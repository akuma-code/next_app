'use server'
import { getPlayers } from "@/Services/playerService";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import Link from "next/link";

async function AvPlayers() {

    const players = await getPlayers("info")

    return (
        <div>
            <List dense disablePadding>
                { players.map((p, idx) =>

                    <ListItem key={ p.id }>
                        <ListItemText>
                            <Typography variant="body1">
                                <Link href={ {
                                    pathname: 'players/' + p.id.toString(),
                                } }
                                    className="hover:underline"
                                >

                                    { idx + 1 }. { p.name }
                                </Link>
                            </Typography>
                            {
                                p.PlayerInfo?.rttf_score &&
                                <Typography variant="body2" ml={ 2 }>
                                    рейтинг: { p.PlayerInfo?.rttf_score }
                                </Typography>
                            }
                        </ListItemText>
                    </ListItem>
                ) }
            </List>
        </div>
    );
}




export default AvPlayers;