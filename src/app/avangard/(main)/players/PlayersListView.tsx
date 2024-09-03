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
    Stack,
    ListSubheader,
    Tooltip,
    TextField,
    Autocomplete,
} from "@mui/material";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { SyntheticEvent, useCallback, useMemo, useState } from "react";

export function PlayersListView({
    players,
    selected,
}: {
    players: {
        id: number;
        name: string;
        _count: { events: number };
        ticket: Prisma.TicketGetPayload<true> | null;
    }[];
    selected: string | null;
}) {
    const [search, setSearch] = useState<string | null>("");
    const [selected_player, select_player] = useState<
        (typeof players)[number] | null
    >(null);
    const search_options = useMemo(() => {
        selected &&
            select_player(players.find((p) => p.id === Number(selected))!);
        return players.map((p) => ({
            id: p.id,
            name: p.name,
            isSelected: p.id.toString() === selected,
        }));
    }, [selected]);
    const query = useQuerySearch();
    const getHref = (player_id: number) =>
        "?" + query("player_id", player_id.toString());

    const handleSearch = useCallback((e: SyntheticEvent, v: string | null) => {
        setSearch((prev) => v);
        if (v) {
            const search_id = selected ? +selected : null;
            const pl = players.find((p) => p.id === search_id);

            select_player(pl ? pl : null);
        }
    }, []);
    const filtered_list = useMemo(
        () => players.filter((p) => p.name.includes(search ?? "")),
        [search]
    );
    return (
        <Box
            sx={{
                borderRadius: 4,
                border: "3px solid",
                borderColor: "primary.dark",
                boxShadow: "0 2px 6px 0 rgba(0,0,0,0.08)",
                bgcolor: "background.paper",
                // maxHeight: 600,
                maxWidth: 370,
            }}
        >
            <Autocomplete
                fullWidth
                freeSolo
                value={search}
                onInputChange={handleSearch}
                options={search_options}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        InputProps={{
                            ...params.InputProps,
                            sx: {
                                borderTopLeftRadius: 8,
                                borderTopRightRadius: 8,
                            },
                        }}
                        variant="filled"
                        placeholder="Введите имя игрока"
                        sx={{ textAlign: "center" }}

                        // sx={{ borderTopLeftRadius: 3 }}
                    />
                )}
                sx={{ px: 1 }}
                noOptionsText={"Совпадений не найдено"}
                isOptionEqualToValue={({ name, id }, value) => id === value.id}
                getOptionLabel={(o) => (typeof o === "string" ? o : o.name)}
                loading={!!search_options}
                loadingText={"searching players..."}
                // renderOption={(props, o) => o.name}
            />

            <List
                dense
                sx={{
                    m: 1,
                    pr: 2,
                    maxHeight: "70vh",
                    // maxHeight: 'inherit',
                    overflowY: "auto",
                    [`& .MuiListItemButton-root.Mui-selected`]: {
                        border: "2px solid #00b0ea9d",
                        borderRadius: 2,
                    },

                    transition: "all .4s ease",
                }}
            >
                <ListSubheader
                    component={"div"}
                    sx={{ textAlign: "center", fontSize: "1.7rem" }}
                >
                    Список игроков
                </ListSubheader>
                {filtered_list.map((p, idx) => (
                    <ListItemButton
                        key={p.name + idx}
                        href={getHref(p.id)}
                        LinkComponent={Link}
                        sx={{
                            bgcolor: p.ticket ? "#2db8e2d5" : "inherit",
                            borderRadius: 2,
                            my: 1,
                        }}
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
                            secondary={p.ticket && `абонемент активен`}
                            secondaryTypographyProps={{
                                fontWeight: "bold",
                                marginInlineStart: 2,
                                color: "#000407",
                                fontSize: 14,
                            }}
                            // sx={{ flexGrow: 1 }}
                        />
                        <Stack
                            direction={"row"}
                            justifyContent={"end"}
                            flexGrow={0}
                            gap={1}
                            // width={"fit-content"}
                        >
                            {p.ticket && (
                                // <ListItemAvatar >
                                <Tooltip title={"Остаток на абонементе"}>
                                    <Avatar
                                        variant="rounded"
                                        sizes="small"
                                        sx={{
                                            p: 0.5,
                                            maxHeight: 28,
                                            maxWidth: 28,
                                            border: "2px solid",
                                            borderColor: "primary.dark",
                                            color: "primary.dark",
                                            bgcolor: "warning.light",
                                            boxShadow:
                                                "0 2px 6px 0 rgba(0,0,0,0.08)",
                                        }}
                                    >
                                        {p.ticket.amount}
                                    </Avatar>
                                </Tooltip>
                                /* </ListItemAvatar> */
                            )}
                            {p._count.events > 0 && (
                                <Tooltip title="Кол-во тренировок">
                                    <Avatar
                                        variant="rounded"
                                        sizes="small"
                                        sx={{
                                            maxHeight: 28,
                                            maxWidth: 28,
                                            // ml: 1,
                                            border: "2px solid",
                                            borderColor: "primary.dark",
                                            color: "primary.dark",
                                            boxShadow:
                                                "0 2px 6px 0 rgba(0,0,0,0.08)",
                                        }}
                                    >
                                        {p._count.events || ""}
                                    </Avatar>
                                </Tooltip>
                            )}
                        </Stack>
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );
}
