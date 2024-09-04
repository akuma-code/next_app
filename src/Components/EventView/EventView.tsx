"use client";
import React, { useMemo, useTransition } from "react";

import { IEvent_Front, avatarColor } from "@/ClientComponents/EventsList";
import { _dbDateParser } from "@/Helpers/dateFuncs";
import { name_letters } from "@/Helpers/stringFns";
import {
    act,
    addPair,
    removePair,
    updatePair,
} from "@/Services/events/eventActions";
import { FastRewindTwoTone, SettingsTwoTone } from "@mui/icons-material";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import {
    Avatar,
    Box,
    BoxProps,
    Button,
    ButtonGroup,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Fade,
    IconButton,
    LinearProgress,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Menu,
    MenuItem,
    SpeedDialAction,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { AddPlayerDialog } from "./AddPlayerDialog";
import CreatePlayerBtn from "./CreatePlayerButton";
import { EventButtons } from "@/ClientComponents/SpeedButtons/EventSpeedDial";
import Icon from "@mdi/react";
import {
    mdiAccountMinus,
    mdiAccountPlusOutline,
    mdiCardAccountDetailsOutline,
    mdiCheck,
    mdiClose,
    mdiConnection,
    mdiSphere,
    mdiSphereOff,
} from "@mdi/js";
import { AddPlayerSpeedDialog } from "./AddPlayerSpeedDial";
import { off } from "process";
import { _log } from "@/Helpers/helpersFns";
import { useToggle } from "@/Hooks/useToggle";
import {
    connectOnePlayer,
    disconnectPlayer,
    updateEventPlayers,
} from "@/Services/eventService";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { createPlayer, getPlayers } from "@/Services/playerService";
import prisma from "@/client/client";
import useMediaDetect from "@/Hooks/useMediaDetect";

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

export const EventView: React.FC<Eventinfo> = ({
    boxProps,
    event,
    masters,
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const session = useSession();
    const { players, date_formated, title, _count, id, pairs, cost } = event;
    const { dd_mm_yyyy } = _dbDateParser(date_formated);
    const [showConnect, connectAction] = useToggle();
    const [showCreate, createAction] = useToggle();
    const [showRemove, removeControl] = useToggle();
    const { isMobile } = useMediaDetect();
    // const pairMasterIdx = (id: number) => pairs.findIndex(p => p.firstPlayerId === id)

    const handlePairChange = async (
        master: { id: number; name: string },
        playerId: number,
        pair: Pair | null
    ) => {
        // _log({ eventId: event.id, playerId, masterId: master.id, pair })
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

    const player_ = (secondPlayerId: number) =>
        event.players.find((p) => p.id === secondPlayerId);
    const master_ = (firstPlayerId: number) =>
        masters.find((m) => m.id === firstPlayerId);

    // const extendPairs = useMemo(() => name_pairs(event.pairs), [event])

    const handleDeletePair = async (pair: Pair | null) => {
        if (!pair) return;
        await removePair(pair.id);
    };
    // const menuOptions = useMemo(() => masters ?? [], [])
    // const parsedPlayers = useMemo(() => parseEvent(event, masters), [event, masters])
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
    // const pairText = (name?: string | null) => name ? `тренер: ${name}` : null
    const toggleCreate = () => {
        createAction.on();
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
                        tooltipTitle={"Новый игрок"}
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
                <ButtonGroup variant="contained" fullWidth>
                    {/* <Button
                        color="warning"
                        size="small"
                        onClick={() => router.push(pathname + "/edit")}
                        startIcon={<SettingsTwoTone />}
                        sx={{ px: 1 }}
                    >
                        Изменить
                    </Button> */}
                    <AddPlayerDialog event_players={players} event_id={id} />
                </ButtonGroup>
            </Divider>

            {/* <Fade in={!!players}>
                <ButtonGroup
                    variant="contained"
                    fullWidth
                    sx={{ mt: 1, mr: 2 }}
                >
                  
                    <CreatePlayerBtn />
                </ButtonGroup>
            </Fade> */}

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
                        {showRemove && (
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
                        )}
                    </ListItem>
                ))}
            </List>
            <ConnectDialog
                event_id={id}
                event_players={players}
                show={showConnect}
                onClose={connectAction.off}
            />
            <CreateDialog show={showCreate} onClose={createAction.off} />
        </Box>
    );
};

interface MenuButtonProps {
    children?: React.ReactNode;
}
async function getData() {
    return await getPlayers();
}
const ConnectDialog = ({
    event_id,
    event_players,
    show,
    onClose,
}: {
    event_players: { id: number; name: string }[];
    event_id: number;
    show: boolean;
    onClose: () => void;
}) => {
    // const [open, { on, off }] = useToggle(show);
    const eventIds = event_players.map((p) => p.id);

    const q = useQuery({
        queryKey: ["players", "all"],
        queryFn: getData,
        placeholderData: keepPreviousData,
        select: (data) => data.filter((d) => !eventIds.includes(d.id)),
        enabled: show,
    });
    if (q.error) {
        _log(q.error);
        return <Box>Fetch players error</Box>;
    }

    async function handleConnectPlayer(eventId: number, playerId: number) {
        return connectOnePlayer.bind(null, eventId, playerId, 1);
    }

    if (q.isLoading) return <LinearProgress />;
    return (
        <Dialog open={show} onClose={onClose}>
            <DialogTitle>Добавить на тренировку</DialogTitle>
            <DialogContent>
                <Stack direction={"column"} spacing={1} justifyContent={"left"}>
                    {q.data?.map((p) => (
                        <Button
                            sx={{ textAlign: "left" }}
                            variant="outlined"
                            size="small"
                            key={p.id}
                            onClick={() => handleConnectPlayer(event_id, p.id)}
                        >
                            {p.name}
                        </Button>
                    ))}
                </Stack>
            </DialogContent>
        </Dialog>
    );
};
const CreateDialog = ({
    onClose,
    show,
}: {
    show: boolean;
    onClose: () => void;
}) => {
    // const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [player, setPlayer] = useState({ name: "" });
    const [isCreating, start] = useTransition();
    // const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     setAnchorEl(event.currentTarget);
    // };

    const handleClose = () => {
        onClose();
    };

    const onCreate = () => {
        start(async () => {
            await createPlayer(player.name);
        });
    };

    // function handleReset() {
    //     setState(prev => input)
    // }
    // const show = Boolean(anchorEl);
    return (
        <Dialog open={show} onClose={onClose}>
            <DialogTitle>Добавить на тренировку</DialogTitle>
            <DialogContent>
                <Box
                    m={1}
                    p={1}
                    display={"flex"}
                    alignItems={"center"}
                    flexDirection={"row"}
                    gap={1}
                >
                    <TextField
                        size="small"
                        name={"name"}
                        value={player.name}
                        onChange={(e) =>
                            setPlayer((prev) => ({
                                ...prev,
                                name: e.target.value,
                            }))
                        }
                        variant="outlined"
                        label={`Введите имя`}
                    />
                    <ButtonGroup sx={{ pt: 0 }} size="small">
                        <Button
                            color="warning"
                            sx={{ bgcolor: "success.main" }}
                            type="submit"
                            title="Подтвердить"
                            onClick={onCreate}
                            disabled={isCreating}
                        >
                            <Icon path={mdiCheck} size={1} color={"success"} />
                        </Button>
                        <Button
                            onClick={handleClose}
                            sx={{ bgcolor: "error.main" }}
                            title="Вернуть начальное значение"
                        >
                            <Icon path={mdiClose} size={1} color={"#000"} />
                        </Button>
                    </ButtonGroup>
                </Box>
            </DialogContent>
        </Dialog>
    );
};
const SelectPairButton: React.FC<MenuButtonProps> = ({ children }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Tooltip title="Занятия с тренером">
                <IconButton
                    onClick={handleOpen}
                    size="small"
                    sx={{ mx: 1 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    color="primary"
                >
                    <Avatar
                        sx={{ bgcolor: "primary.dark", width: 32, height: 32 }}
                        variant="rounded"
                    >
                        <SupervisorAccountIcon sx={{ color: "primary" }} />
                    </Avatar>
                </IconButton>
            </Tooltip>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                slotProps={{
                    paper: {
                        elevation: 1,
                        sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: 1.5,
                            "& .MuiAvatar-root": {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            "&::before": {
                                content: '""',
                                display: "block",
                                position: "absolute",
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: "background.paper",
                                transform: "translateY(-50%) rotate(45deg)",
                                zIndex: 0,
                            },
                        },
                    },
                }}
            >
                {children}
            </Menu>
        </React.Fragment>
    );
};

SelectPairButton.displayName = "_________Pair Select";

EventView.displayName = "______EventIdView";
