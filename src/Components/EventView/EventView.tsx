"use client";
import React, { useMemo } from "react";

import { IEvent_Front, avatarColor } from "@/ClientComponents/EventsList";
import { EventButtons } from "@/ClientComponents/SpeedButtons/EventSpeedDial";
import SelectPairButton from "@/ClientComponents/UI/SelectPairButton";
import { _dbDateParser } from "@/Helpers/dateFuncs";
import { name_letters } from "@/Helpers/stringFns";
import useMediaDetect from "@/Hooks/useMediaDetect";
import { useToggle } from "@/Hooks/useToggle";
import {
    addPair,
    removePair,
    updatePair,
} from "@/Services/events/eventActions";
import { disconnectPlayer } from "@/Services/eventService";
import {
    mdiAccountMinus,
    mdiAccountPlusOutline,
    mdiCardAccountDetailsOutline,
    mdiCash,
    mdiSphere,
} from "@mdi/js";
import Icon from "@mdi/react";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import {
    Avatar,
    Box,
    BoxProps,
    Button,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    MenuItem,
    SpeedDialAction,
    Typography,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { ConnectDialog, CreatePlayerDialog } from "../Modals/PlayersDialogs";

interface Pair {
    id: number;
    eventId: number;
    firstPlayerId: number;
    secondPlayerId: number;
}

type TEvent = IEvent_Front & { pairs: Pair[]; cost: number };
interface Eventinfo {
    boxProps?: BoxProps<"div">;
    event: TEvent;
    masters: { id: number; name: string }[];
}
//!----------------------------------------------------------------------------------
export const EventView: React.FC<Eventinfo> = ({
    boxProps,
    event,
    masters,
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const { players, date_formated, title, _count, id, pairs } = event;
    const { dd_mm_yyyy } = _dbDateParser(date_formated);
    const [showConnect, connectAction] = useToggle();
    const [showCreate, createAction] = useToggle();
    const [showRemove, removeControl] = useToggle();
    const { isMobile } = useMediaDetect();

    const handlePairChange = async (
        master: { id: number; name: string },
        playerId: number,
        pair: Pair | null
    ) => {
        if (!pair) {
            return await addPair({
                eventId: event.id,
                playerId,
                masterId: master.id,
            });
        } else {
            return await updatePair(pair.id, { masterId: master.id, playerId });
        }
    };

    const master_ = (firstPlayerId: number) =>
        masters.find((m) => m.id === firstPlayerId);

    const handleDeletePair = async (pair: Pair | null) => {
        if (!pair) return;
        await removePair(pair.id);
    };

    const player_pairs = useMemo(() => {
        const pairPlayerIdx = (id: number) =>
            pairs.findIndex((p) => p.secondPlayerId === id);
        const _players = players.map((p) => {
            const idx = pairPlayerIdx(p.id);
            const withpair =
                idx >= 0 ? { ...p, pair: pairs[idx] } : { ...p, pair: null };
            return withpair;
        });
        return _players;
    }, [pairs, players]);

    const toggleCreate = () => {
        createAction.on();
    };
    const handleOpenConnect = () => {
        connectAction.on();
        removeControl.on();
    };
    return (
        <Box
            {...boxProps}
            sx={{
                borderRadius: 4,
                minWidth: 330,
                width: "fit-content",
                maxWidth: 400,
                border: "2px solid",
                borderColor: "primary.dark",
                bgcolor: "background.paper",
                boxShadow: "0 2px 6px 0 rgba(0,0,0,0.08)",
                ...boxProps?.sx,
            }}
            m={2}
            p={1}
        >
            <Box
                sx={{
                    display: "flex",
                    p: 1.5,
                    alignItems: "center",
                    gap: 2,
                    justifyContent: "space-between",
                    // position: "relative",
                }}
            >
                <EventButtons>
                    <SpeedDialAction
                        tooltipOpen={!isMobile}
                        tooltipPlacement="right"
                        icon={<Icon path={mdiSphere} size={0.8} />}
                        tooltipTitle={"управление"}
                        onClick={removeControl.toggle}
                    />
                    <SpeedDialAction
                        tooltipOpen={!isMobile}
                        tooltipPlacement="right"
                        icon={<Icon path={mdiAccountPlusOutline} size={0.8} />}
                        tooltipTitle={"Создать"}
                        onClick={toggleCreate}
                    />

                    <SpeedDialAction
                        tooltipOpen={!isMobile}
                        tooltipPlacement="right"
                        icon={
                            <Icon
                                path={mdiCardAccountDetailsOutline}
                                size={0.8}
                            />
                        }
                        onClick={() => router.push(pathname + "/edit")}
                        tooltipTitle={"Редактировать"}
                    />
                </EventButtons>
                <Box>
                    <Typography variant="h5" component={"div"}>
                        {title}
                    </Typography>
                    <Typography variant="body1" fontSize={18}>
                        {dd_mm_yyyy}
                    </Typography>
                </Box>
                <Avatar
                    variant="rounded"
                    sx={{
                        mt: 0.5,
                        mb: 0,
                        bgcolor: avatarColor(_count?.players || 0),
                    }}
                >
                    {_count?.players}
                </Avatar>
            </Box>

            <Divider flexItem>
                <Button
                    onClick={handleOpenConnect}
                    color="warning"
                    size="small"
                    variant="contained"
                    startIcon={<SupervisorAccountIcon />}
                >
                    Добавить
                </Button>
            </Divider>

            <List>
                {player_pairs.map((p, index) => (
                    <ListItem
                        key={index}
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                        dense
                        divider
                    >
                        <ListItemAvatar>
                            <Avatar
                                variant="rounded"
                                sx={{
                                    width: 32,
                                    height: 32,
                                    bgColor: "primary.light",
                                    p: 0.5,
                                    color: "primary.main",
                                    fontSize: 15,
                                }}
                            >
                                {name_letters(p.name)}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={p.name}
                            primaryTypographyProps={{ textAlign: "left" }}
                            secondary={
                                p.pair && master_(p.pair.firstPlayerId)?.name
                            }
                            secondaryTypographyProps={{
                                fontWeight: "bold",
                                bgcolor: "primary.light",
                                textAlign: "right",
                                color: "primary.contrastText",
                                px: 1,
                                py: 0.3,
                            }}
                        />
                        {showRemove ? (
                            <>
                                <SelectPairButton>
                                    <MenuItem
                                        sx={{ justifyContent: "right" }}
                                        onClick={() => handleDeletePair(p.pair)}
                                    >
                                        <Avatar
                                            sx={{ bgcolor: "warning.light" }}
                                        >
                                            X
                                        </Avatar>
                                    </MenuItem>

                                    {masters.map((m) => (
                                        <MenuItem
                                            key={m.name}
                                            onClick={() =>
                                                handlePairChange(
                                                    m,
                                                    p.id,
                                                    p.pair
                                                )
                                            }
                                        >
                                            <Avatar />
                                            {m.name}
                                        </MenuItem>
                                    ))}
                                </SelectPairButton>

                                <IconButton
                                    hidden={showRemove}
                                    aria-label="remove player"
                                    title="remove"
                                    onClick={async () =>
                                        await disconnectPlayer(p.id, id)
                                    }
                                    edge="end"
                                    color="error"
                                    sx={{ bgcolor: "darkgray" }}
                                >
                                    <Icon
                                        path={mdiAccountMinus}
                                        size={1}
                                        className="px-1 "
                                    />
                                </IconButton>
                            </>
                        ) : (
                            p.ticket && (
                                <Avatar
                                    variant="rounded"
                                    sx={{
                                        bgcolor: "lightblue",
                                        color: "primary.dark",
                                        width: 72,
                                        height: 32,
                                        gap: 1,
                                        display: "flex",
                                    }}
                                >
                                    <Icon
                                        className="flex-grow"
                                        path={mdiCash}
                                        size={1.5}
                                    />

                                    <Box
                                        flexGrow={1}
                                        border={"1px solid red"}
                                        minWidth={24}
                                        textAlign={"center"}
                                    >
                                        {p.ticket.amount}
                                    </Box>
                                </Avatar>
                            )
                        )}
                    </ListItem>
                ))}
            </List>
            <ConnectDialog
                show={showConnect}
                onClose={connectAction.off}
                event={event}
            />
            <CreatePlayerDialog show={showCreate} onClose={createAction.off} />
        </Box>
    );
};

EventView.displayName = "______EventIdView";
