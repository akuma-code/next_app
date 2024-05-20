'use client'

import CMCard from "@/mui-treasury/card-team/CardTeam"
import { getInfoApexStyles } from "@/mui-treasury/info-apex";
import { InfoTitle, InfoSubtitle, Info } from "@/mui-treasury/info-basic";

import { Box, AvatarGroup, Avatar } from "@mui/material";
import mock_events from "./mock_events";
import AdeptusMechanicus from "@/Components/Icons/AdeptusMechanicus";
import { avatarColor } from "@/ClientComponents/EventsList";
import Link from "next/link";
import { usePathname } from "next/navigation";
import dayjs from "dayjs";
const { DivRoot, ColumnCard, ButtonJoin, AvatarLogo } = CMCard

const event_data = mock_events
interface EventData {
    id: number;
    date_formated: string;
    players: {
        id: number;
        name: string;
    }[];
    _count?: {
        players: number;
    };

}
export const EventViewCard = ({ title, subtitle, description, thumbnail, event,
}: {
    title: string;
    subtitle: string;
    description: React.ReactNode;
    thumbnail?: string;
    event: EventData

}) => {
    const d = event.date_formated.replaceAll("_", ".")
    const dayWeek = dayjs(d, 'DD.MM.YYYY', 'ru').weekday()
    const pathname = usePathname()
    const name_letters = (name: string) => name.split(" ").map(n => n[0]).join("")
    const _c = event._count?.players || 0
    return (
        <DivRoot>
            <ColumnCard>
                <Box display="flex" p={ 2 } gap={ 2 } flexWrap="nowrap">
                    <AvatarLogo variant={ "rounded" } ><AdeptusMechanicus className="w-24 h-24" /></AvatarLogo>
                    <Info useStyles={ getInfoApexStyles } sx={ { alignSelf: "center" } }>
                        <InfoTitle>{ title }</InfoTitle>
                        <InfoSubtitle>{ subtitle }</InfoSubtitle>
                    </Info>
                </Box>
                <Box
                    pb={ 0.5 }
                    px={ 1 }
                    color={ "grey.600" }
                    fontSize={ "0.875rem" }
                    fontFamily={ "Ubuntu" }
                    flexGrow={ 1 }
                >
                    { description }
                </Box>
                <Box
                    display="flex"
                    p={ 2 }
                    gap={ 2 }
                    sx={ {
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        "&& > *": {
                            minWidth: `clamp(0px, (248px + 1px - 100%) * 999, 100%)`,
                        },
                    } }
                >
                    <Box>
                        <AvatarGroup
                            max={ 4 }
                            sx={ {
                                "& .MuiAvatar-root": {
                                    fontFamily: "Ubuntu",
                                    fontSize: "0.875rem",
                                    backgroundColor: avatarColor(_c), //"#6d7efc"
                                    width: 32,
                                    height: 32,
                                    "&:first-of-type": {
                                        marginRight: "auto",
                                    },
                                },
                            } }
                        >
                            { event.players.map(p =>
                                <Avatar key={ p.name } >
                                    { name_letters(p.name) }
                                </Avatar>

                            ) }
                        </AvatarGroup>
                    </Box>
                    <Link href={ {
                        pathname: pathname + `/${event.id}`
                    } }>
                        <ButtonJoin variant={ "contained" } color={ "primary" } disableRipple>
                            Открыть
                        </ButtonJoin>
                    </Link>
                </Box>
            </ColumnCard>
        </DivRoot>
    )
};