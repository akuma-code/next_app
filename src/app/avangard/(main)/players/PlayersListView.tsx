"use client";

import { useQuerySearch } from "@/Hooks/useQuerySearch";
import { mdiCloseOutline } from "@mdi/js";
import Icon from "@mdi/react";
import {
    Autocomplete,
    Avatar,
    Box,
    List,
    ListItemButton,
    ListItemText,
    ListSubheader,
    Stack,
    TextField,
    Tooltip,
} from "@mui/material";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
    const router = useRouter();
    const pathname = usePathname();
    const [search, setSearch] = useState<string | null>("");
    const [selected_player, select_player] = useState<
        (typeof players)[number] | null
    >(null);
    const search_options = useMemo(() => {
        if (search?.length === 0) return [];
        selected &&
            select_player(players.find((p) => p.id === Number(selected))!);

        return players.map((p) => ({
            id: p.id,
            name: p.name,
            isSelected: p.id.toString() === selected,
        }));
    }, [search?.length, selected, players]);

    const query = useQuerySearch();
    const getHref = (player_id: number) =>
        "?" + query("player_id", player_id.toString());

    const handleSearch = useCallback(
        (e: SyntheticEvent, v: string | null) => {
            setSearch((prev) => v);
            if (v) {
                const search_id = selected ? +selected : null;
                const pl = players.find((p) => p.id === search_id);

                select_player((prev) => (pl ? pl : null));
            }
        },
        [selected, players]
    );
    const filtered_list = useMemo(
        () => players.filter((p) => p.name.includes(search ?? "")),
        [players, search]
    );

    function clearQuery(e: React.FormEvent) {
        e.preventDefault();
        return router.replace(pathname);
    }
    return (
        <Box
            sx={{
                borderRadius: 4,
                border: "3px solid",
                borderColor: "primary.dark",
                boxShadow: "0 2px 6px 0 rgba(0,0,0,0.08)",
                bgcolor: "background.paper",
                maxHeight: "60vh",
                maxWidth: 370,
                p: 1,
            }}
        >
            <Autocomplete
                autoHighlight
                fullWidth
                ListboxProps={{ sx: { width: 250 } }}
                freeSolo
                value={search}
                onInputChange={handleSearch}
                options={search_options}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        slotProps={{
                            input: {
                                ...params.InputProps,
                                sx: {
                                    borderTopLeftRadius: 8,
                                    borderTopRightRadius: 8,
                                },
                            },
                        }}
                        variant="filled"
                        placeholder="Введите имя игрока"
                        sx={{ textAlign: "center" }}
                        // sx={{ borderTopLeftRadius: 3 }}
                    />
                )}
                clearIcon={<Icon path={mdiCloseOutline} size={1} />}
                clearOnEscape
                sx={{ px: 1 }}
                noOptionsText={"Совпадений не найдено"}
                isOptionEqualToValue={({ name, id }, value) => id === value.id}
                getOptionLabel={(o) => (typeof o === "string" ? o : o.name)}
                loading={filtered_list.length === 0}
                loadingText={"Нет совпадений"}
                // renderOption={(props, o) => o.name}
            />
            <Box minWidth={330} maxHeight={"46vh"} overflow={"auto"}>
                {/* <ListSubheader
                    // component={Typography}
                    sx={{
                        position: "sticky",
                        textAlign: "center",
                        fontSize: "1.2rem",
                        zIndex: 1,
                        // w: "100%",
                        bgcolor: "beige",
                        // my: 1.5,
                    }}
                >
                    {selected_player?.name || ""}
                </ListSubheader> */}

                <List
                    dense
                    sx={{
                        mx: 1,
                        pr: 2,
                        [`& .MuiListItemButton-root.Mui-selected`]: {
                            border: "2px solid #00b0ea9d",
                            borderRadius: 2,
                        },
                        bgcolor: "beige",
                        transition: "all .4s ease",
                        position: "relative",
                    }}
                >
                    {filtered_list.map((p, idx) => (
                        <ListItemButton
                            id={p.id.toString()}
                            key={p.name + idx}
                            href={getHref(p.id)}
                            LinkComponent={Link}
                            sx={{
                                gap: 1,
                                borderRadius: 2,
                            }}
                            selected={p.id === Number(selected)}
                        >
                            <ListItemText
                                color="primary.dark"
                                primaryTypographyProps={{
                                    variant: "body1",
                                    textAlign: "left",
                                }}
                                primary={p.name}
                                secondary={
                                    p.ticket
                                        ? `абонемент: ${p.ticket.amount}/${p.ticket.limit}`
                                        : "оплата по факту"
                                }
                                secondaryTypographyProps={{
                                    fontWeight: "bold",
                                    // marginInlineStart: 2,
                                    color: "#000407",
                                    fontSize: 14,
                                    textAlign: "left",
                                }}
                                // sx={{ flexGrow: 1 }}
                            />
                            <Stack
                                direction={"row"}
                                justifyContent={"end"}
                                flexGrow={1}
                                gap={1}
                                // width={"fit-content"}
                            >
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
        </Box>
    );
}
