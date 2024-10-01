"use client";

import DeleteButton from "@/ClientComponents/UI/DeleteButton";
import { PlayerWithTicket } from "@/Services/playerService";
import { DeleteTwoTone } from "@mui/icons-material";
import {
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
} from "@mui/material";
import dayjs from "dayjs";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const AdminPlayerList = ({ players }: { players: PlayerWithTicket[] }) => {
    const q = useSearchParams();
    const action = q.get("action");
    const deleteMode = action === "delete";

    const created = (date: Date) => dayjs(date).format("DD-MM-YYYY");
    return (
        <Suspense fallback={<>Loading...</>}>
            <List
                dense
                disablePadding
                sx={{
                    border: "1px solid black",
                    borderRadius: "1rem",
                    maxHeight: "60vh",
                    overflowX: "auto",
                    maxWidth: 400,
                    width: "100%",

                    [`& .MuiListItem-root`]: {
                        display: "flex",
                        justifyContent: "space-between",
                        maxWidth: 350,

                        flexDirection: "row",
                        flexGrow: 1,
                        gap: 1,
                    },
                    m: 2,
                    // [`& :hover.MuiListItem-root`]: {
                    //     bgcolor: (theme) => alpha(theme.palette.primary.light, .7)
                    // }
                }}
            >
                {players.map((p, idx) => (
                    <ListItem key={p.id} divider alignItems="center">
                        <ListItemText
                            primary={
                                <Link
                                    href={{
                                        href: `/admin/players`,
                                        query: { action: "edit", id: p.id },
                                    }}
                                    className="hover:underline"
                                >
                                    {idx + 1}) {p.name} [id:{p.id}]
                                </Link>
                            }
                            secondary={`создан: ${created(p.createdAt)}`}
                            primaryTypographyProps={{ textAlign: "left" }}
                        />
                        {/* <Link href={ `/admin/players/${p.id}?action=edit` }> */}

                        {/* </Link> */}
                        {/* <Link href={ `/admin/players/${p.id}?action=edit` }>
                                <ListItemButton sx={ { gap: 1 } } >
                                    { idx + 1 } )
                                    <Typography variant="button">{ p.name }</Typography>

                                </ListItemButton>
                            </Link> */}

                        {
                            <ListItemSecondaryAction
                                color="error"
                                title="delete"
                                hidden={!deleteMode}
                            >
                                <DeleteButton deleteId={+p.id}>
                                    <DeleteTwoTone />
                                </DeleteButton>
                            </ListItemSecondaryAction>
                        }
                    </ListItem>
                ))}
            </List>
        </Suspense>
    );
};

export default AdminPlayerList;
