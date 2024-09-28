"use client";

import CMCard from "@/mui-treasury/card-team/CardTeam";
import { getInfoApexStyles } from "@/mui-treasury/info-apex";
import { Info, InfoSubtitle, InfoTitle } from "@/mui-treasury/info-basic";

import { avatarColor } from "@/ClientComponents/EventsList";
import { SettingsTwoTone } from "@mui/icons-material";
import OpenWithOutlinedIcon from "@mui/icons-material/OpenWithOutlined";
import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    ButtonGroup,
    Dialog,
    DialogContent,
    DialogTitle,
    List,
    ListItemText,
    ListSubheader,
} from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import mock_events from "./mock_events";

import { _log } from "@/Helpers/helpersFns";
import { useSession } from "next-auth/react";
import { useDialogs } from "@toolpad/core";
import { Pair } from "@prisma/client";
import Icon from "@mdi/react";
import { mdiKabaddi } from "@mdi/js";
const { DivRoot, ColumnCard, ButtonJoin, AvatarLogo } = CMCard;

interface EventData {
    id: number;
    date_formated: string;
    players: {
        id: number;
        name: string;
    }[];
    pairs?: Pair[];
    title?: string | null;
    _count?: {
        players: number;
    };
}
interface EventCardProps {
    title: string;
    subtitle: string;
    description: React.ReactNode;
    thumbnail?: string;
    event: EventData;
}

export const EventViewCard = ({
    title,
    subtitle,
    description,
    thumbnail,
    event,
}: EventCardProps) => {
    const d = useDialogs();
    const router = useRouter();
    const pathname = usePathname();
    const name_letters = (name: string) =>
        name
            .split(" ")
            .map((n) => n[0])
            .join("");
    const _c = event._count?.players || 0;

    const { status, data } = useSession();
    const show = () => d.open(EventViewDialog, event);
    return (
        <DivRoot>
            <ColumnCard>
                <Box display="flex" p={2} gap={2} flexWrap="nowrap">
                    <AvatarLogo
                        variant={"rounded"}
                        sx={{ bgcolor: avatarColor(_c), color: "primary.dark" }}
                    >
                        {_c}
                    </AvatarLogo>
                    <Info
                        useStyles={getInfoApexStyles}
                        sx={{ alignSelf: "center" }}
                    >
                        <InfoTitle>{title}</InfoTitle>
                        <InfoSubtitle
                            sx={{ textAlign: "end", fontWeight: "bold" }}
                        >
                            {subtitle}
                        </InfoSubtitle>
                    </Info>
                </Box>
                <Box
                    pb={0.5}
                    px={1}
                    color={"primary.dark"}
                    fontSize={"1rem"}
                    fontFamily={"Ubuntu"}
                    flexGrow={1}
                    textAlign={"center"}
                >
                    {description}
                </Box>
                <Box
                    display="flex"
                    p={2}
                    gap={2}
                    sx={{
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        "&& > *": {
                            minWidth: `clamp(0px, (248px + 1px - 100%) * 999, 100%)`,
                        },
                    }}
                >
                    <Box>
                        <AvatarGroup
                            max={4}
                            sx={{
                                "& .MuiAvatar-root": {
                                    fontFamily: "Ubuntu",
                                    fontSize: "0.875rem",
                                    backgroundColor: "#3d54fc",
                                    width: 32,
                                    height: 32,
                                    "&:first-of-type": {
                                        marginRight: "auto",
                                    },
                                },
                            }}
                        >
                            {event.players.map((p) => (
                                <Avatar key={p.name}>
                                    {name_letters(p.name)}
                                </Avatar>
                            ))}
                        </AvatarGroup>
                    </Box>
                    {/* <Stack direction={ 'row' } justifyContent={ 'space-between' }> */}

                    <ButtonGroup
                        size="small"
                        orientation="vertical"
                        variant={"contained"}
                        sx={{ borderRadius: 30 }}
                    >
                        <Button
                            startIcon={<Icon path={mdiKabaddi} size={1} />}
                            color="primary"
                            variant="outlined"
                            onClick={show}
                            sx={{ borderRadius: 30 }}
                        >
                            Состав
                        </Button>
                        {data?.user && (
                            <Button
                                color="primary"
                                LinkComponent={Link}
                                // href={pathname + `/${event.id}`}
                                onClick={() =>
                                    router.push(`${pathname}/${event.id}`)
                                }
                                startIcon={<OpenWithOutlinedIcon />}
                            >
                                Открыть
                            </Button>
                        )}
                    </ButtonGroup>

                    {/* </Stack> */}
                </Box>
            </ColumnCard>
        </DivRoot>
    );
};

function EventViewDialog({
    open,
    onClose,
    payload,
}: {
    open: boolean;
    onClose: (result: unknown) => void;
    payload?: EventData;
}) {
    if (!payload) return null;
    const { title = "", pairs = [], players = [] } = payload;

    return (
        <Dialog open={open} onClose={onClose} scroll="paper">
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <ListSubheader sx={{ fontSize: 18, fontWeight: "bold" }}>
                    Всего: {players.length}
                </ListSubheader>
                <List>
                    {players.map((p) => (
                        <ListItemText key={p.id} primary={p.name} />
                    ))}
                </List>
            </DialogContent>
        </Dialog>
    );
}
