"use client";

import CMCard from "@/mui-treasury/card-team/CardTeam";
import { getInfoApexStyles } from "@/mui-treasury/info-apex";
import { Info, InfoSubtitle, InfoTitle } from "@/mui-treasury/info-basic";

import { avatarColor } from "@/ClientComponents/EventsList";
import { SettingsTwoTone } from "@mui/icons-material";
import OpenWithOutlinedIcon from "@mui/icons-material/OpenWithOutlined";
import { Avatar, AvatarGroup, Box, Button, ButtonGroup } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import mock_events from "./mock_events";

import { _log } from "@/Helpers/helpersFns";
import { useSession } from "next-auth/react";
const { DivRoot, ColumnCard, ButtonJoin, AvatarLogo } = CMCard;

const event_data = mock_events;
interface EventData {
    id: number;
    date_formated: string;
    players: {
        id: number;
        name: string;
    }[];
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
    const d = event.date_formated.replaceAll("_", ".");
    const router = useRouter();
    const pathname = usePathname();
    const name_letters = (name: string) =>
        name
            .split(" ")
            .map((n) => n[0])
            .join("");
    const _c = event._count?.players || 0;

    const { status, data } = useSession();

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

                    {data?.user && (
                        <ButtonGroup
                            size="small"
                            orientation="vertical"
                            variant={"contained"}
                            sx={{ borderRadius: 30 }}
                        >
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
                            <Button
                                startIcon={<SettingsTwoTone />}
                                color="secondary"
                            >
                                развернуть
                            </Button>
                        </ButtonGroup>
                    )}

                    {/* </Stack> */}
                </Box>
            </ColumnCard>
        </DivRoot>
    );
};
