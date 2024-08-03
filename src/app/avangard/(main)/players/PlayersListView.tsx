"use client";

import { useQuerySearch } from "@/Hooks/useQuerySearch";
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemAvatar,
    Avatar,
} from "@mui/material";
import Link from "next/link";

export function PlayersListView({
    players,
    selected,
}: {
    players: { id: number; name: string; _count: { events: number } }[];
    selected: string | null;
}) {
    const query = useQuerySearch();

    return (
        <Box
            sx={{
                borderRadius: 4,

                border: "2px solid",
                borderColor: "primary.dark",
                boxShadow: "0 2px 6px 0 rgba(0,0,0,0.08)",
                bgcolor: "background.paper",
                // maxHeight: 600,
            }}
        >
            <List
                dense
                disablePadding
                sx={{
                    maxWidth: 350,
                    m: 2,
                    // maxHeight: playerId ? '30vh' : '70vh',
                    // maxHeight: 'inherit',
                    overflowY: "auto",
                    [`& .MuiListItem-root .Mui-selected`]: {
                        border: "2px solid #00b0ea9d",
                        borderRadius: 2,
                    },
                }}
            >
                {players.map((p, idx) => (
                    <ListItem key={p.id} sx={{ minWidth: "fit-content" }}>
                        <ListItemButton
                            // href={`?player_id=${p.id}`}
                            href={`?${query("player_id", p.id.toString())}`}
                            LinkComponent={Link}
                            selected={p.id === Number(selected)}
                        >
                            <ListItemText
                                color="primary.dark"
                                primaryTypographyProps={{ variant: "body2" }}
                                primary={
                                    <span>
                                        {idx + 1}. {p.name}
                                    </span>
                                }
                            />

                            <ListItemAvatar>
                                <Avatar
                                    variant="rounded"
                                    sizes="small"
                                    sx={{
                                        maxHeight: 28,
                                        maxWidth: 28,
                                        ml: 1,
                                        border: "2px solid",
                                        borderColor: "primary.dark",
                                        color: "primary.dark",
                                        boxShadow:
                                            "0 2px 6px 0 rgba(0,0,0,0.08)",
                                    }}
                                >
                                    {p._count.events || 0}
                                </Avatar>
                            </ListItemAvatar>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
