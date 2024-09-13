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
    mdiCurrencyRub,
    mdiEye,
    mdiEyeOff,
} from "@mdi/js";
import Icon from "@mdi/react";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import {
    Avatar,
    Box,
    BoxProps,
    Button,
    ButtonGroup,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    MenuItem,
    SpeedDialAction,
    Stack,
    ToggleButton,
    Typography,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { ConnectDialog, CreatePlayerDialog } from "../Modals/PlayersDialogs";
import { Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";

interface Pair {
    id: number;
    eventId: number;
    firstPlayerId: number;
    secondPlayerId: number;
}

type TEvent = Prisma.EventGetPayload<{
    select: {
        id: true;
        date_formated: true;
        players: { select: { id: true; name: true; ticket: true } };
        pairs: true;
        cost: true;
        title: true;
        _count: { select: { players: true } };
    };
}>;
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
    const { data, status } = useSession();
    const canSee = status === "authenticated";
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
        const _players = players?.map((p) => {
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
                width: "max-content",
                maxWidth: 420,
                height: "max-content",
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
                    gap: 1,
                    justifyContent: "space-between",
                    // position: "relative",
                }}
            >
                {canSee && (
                    <EventButtons>
                        <SpeedDialAction
                            tooltipOpen={!isMobile}
                            tooltipPlacement="right"
                            icon={
                                <Icon path={mdiAccountPlusOutline} size={0.8} />
                            }
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
                )}
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
            {canSee && (
                <Divider flexItem>
                    <ButtonGroup variant="contained" fullWidth>
                        <Button
                            onClick={handleOpenConnect}
                            color="warning"
                            // size="small"
                            // variant="contained"
                            startIcon={<SupervisorAccountIcon />}
                        >
                            Добавить
                        </Button>
                        <ToggleButton
                            color="warning"
                            // sx={{ bgcolor: "grey" }}
                            value={showRemove}
                            onClick={removeControl.toggle}
                            selected={showRemove}
                        >
                            <Icon
                                path={showRemove ? mdiEye : mdiEyeOff}
                                size={1}
                            />
                        </ToggleButton>
                    </ButtonGroup>
                </Divider>
            )}
            <List>
                {player_pairs.map((p) => (
                    <ListItem
                        key={p.id}
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            minHeight: "2.5rem",
                            gap: 1,
                        }}
                        divider
                        disablePadding
                    >
                        {showRemove ? (
                            <Button
                                aria-label="remove player"
                                // title="remove"
                                onClick={async () =>
                                    await disconnectPlayer(p.id, id)
                                }
                                // edge="start"
                                color="error"
                                sx={{
                                    bgcolor: "darkgray",
                                    flexGrow: 0,
                                    display: "flex",
                                    p: 1,
                                    fontSize: "1rem",
                                }}
                            >
                                <Icon
                                    path={mdiAccountMinus}
                                    size={0.8}
                                    className="flex-grow text-center"
                                />
                            </Button>
                        ) : (
                            <ListItemAvatar>
                                <Avatar
                                    variant="rounded"
                                    sx={{
                                        width: 30,
                                        height: 30,
                                        bgColor: "primary.light",
                                        // p: 0.5,
                                        color: "primary.main",
                                        // fontSize: 15,
                                    }}
                                >
                                    {name_letters(p.name)}
                                </Avatar>
                            </ListItemAvatar>
                        )}
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
                                // px: 1,
                                // py: 0.3,
                            }}
                        />
                        {showRemove ? (
                            <Stack
                                direction={"row"}
                                spacing={1}
                                alignSelf={"center"}
                            >
                                <SelectPairButton>
                                    <MenuItem
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
                                            {m.name}
                                        </MenuItem>
                                    ))}
                                </SelectPairButton>

                                {/* <Button
                                    aria-label="remove player"
                                    // title="remove"
                                    onClick={async () =>
                                        await disconnectPlayer(p.id, id)
                                    }
                                    // edge="start"
                                    color="error"
                                    sx={{
                                        bgcolor: "darkgray",
                                        flexGrow: 0,
                                        display: "flex",
                                        p: 1,
                                        fontSize: "1rem",
                                    }}
                                >
                                    <Icon
                                        path={mdiAccountMinus}
                                        size={0.8}
                                        className="flex-grow text-center"
                                    />
                                </Button> */}
                            </Stack>
                        ) : (
                            p.ticket && (
                                <Avatar
                                    variant="rounded"
                                    sx={{
                                        bgcolor: "lightblue",
                                        color: "primary.dark",
                                        width: 72,
                                        height: 48,
                                        gap: 1,
                                        display: "flex",
                                    }}
                                >
                                    <Icon
                                        className="flex-grow"
                                        path={mdiCurrencyRub}
                                        size={1}
                                    />

                                    <Box
                                        flexGrow={1}
                                        minWidth={18}
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
