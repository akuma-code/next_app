'use client'

import DeleteButton from "@/ClientComponents/UI/DeleteButton";
import { useToggle } from "@/Hooks/useToggle";
import { PlayerWithInfo } from "@/Services/playerService";
import { EditTwoTone, DeleteTwoTone } from "@mui/icons-material";
import { alpha, List, ListItem, ListItemButton, ListItemIcon, ListItemSecondaryAction, ListItemText, Stack, Typography } from "@mui/material";
import { Info, Player } from "@prisma/client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";


const AdminPlayerList = ({ players }: { players: PlayerWithInfo[] }) => {
    const q = useSearchParams()
    const deleteMode = q.get('action') === 'delete'


    return (
        <Suspense fallback={ <>Loading...</> }>
            <List dense disablePadding
                sx={ {
                    border: '1px solid black',
                    borderRadius: '1rem',
                    maxHeight: '60vh',
                    overflowX: 'auto',

                    // scrollMarginInlineStart: 20,
                    // scrollbarColor: 'red',
                    // scrollPaddingTop: '1rem',
                    [`& .MuiListItem-root`]: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        maxWidth: 350,
                        flexDirection: 'row',
                        flexGrow: 1,
                        gap: 1
                    },
                    m: 2
                    // [`& :hover.MuiListItem-root`]: {
                    //     bgcolor: (theme) => alpha(theme.palette.primary.light, .7)
                    // }
                } }
            >
                {
                    players.map((p, idx) =>

                        <ListItem key={ p.id } divider alignItems="center" >

                            <Link href={ `/admin/players/${p.id}?action=edit` }>
                                <ListItemButton sx={ { gap: 1 } } >
                                    { idx + 1 } )
                                    <Typography variant="button">{ p.name }</Typography>

                                </ListItemButton>
                            </Link>



                            {
                                <ListItemSecondaryAction color="error" title="delete" hidden={ !deleteMode } >
                                    <DeleteButton deleteId={ +p.id }>
                                        <DeleteTwoTone />
                                    </DeleteButton>
                                </ListItemSecondaryAction>
                            }
                        </ListItem>
                    )
                }
            </List>
        </Suspense>
    );

}

export default AdminPlayerList