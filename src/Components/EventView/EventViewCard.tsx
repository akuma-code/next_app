'use client'

import CMCard from "@/mui-treasury/card-team/CardTeam"
import { getInfoApexStyles } from "@/mui-treasury/info-apex";
import { InfoTitle, InfoSubtitle, Info } from "@/mui-treasury/info-basic";

import { Box, AvatarGroup, Avatar, IconButton, Stack, SvgIcon, ButtonGroup } from "@mui/material";
import mock_events from "./mock_events";
import AdeptusMechanicus from "@/Components/Icons/AdeptusMechanicus";
import { avatarColor } from "@/ClientComponents/EventsList";
import Link from "next/link";
import { usePathname } from "next/navigation";
import dayjs from "dayjs";
import LinkMui from "@/ClientComponents/UI/LinkMui";
import { EventViewEditDialog } from "./EventViewEditDialog";
import { SettingsTwoTone } from "@mui/icons-material";
import OpenInBrowserOutlinedIcon from '@mui/icons-material/OpenInBrowserOutlined';
import OpenWithOutlinedIcon from '@mui/icons-material/OpenWithOutlined';
const { DivRoot, ColumnCard, ButtonJoin, AvatarLogo } = CMCard

const event_data = mock_events
interface EventData {
    id: number;
    date_formated: string;
    players: {
        id: number;
        name: string;
    }[];
    title?: string | null
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

export const EventViewCard = ({ title, subtitle, description, thumbnail, event }: EventCardProps) => {
    const d = event.date_formated.replaceAll("_", ".")

    const pathname = usePathname()
    const name_letters = (name: string) => name.split(" ").map(n => n[0]).join("")
    const _c = event._count?.players || 0
    return (
        <DivRoot>
            <ColumnCard>
                <Box display="flex" p={ 2 } gap={ 2 } flexWrap="nowrap">
                    <AvatarLogo variant={ "rounded" } color={ 'primary.dark' } sx={ { bgcolor: avatarColor(_c) } }>
                        { _c }
                    </AvatarLogo>
                    <Info useStyles={ getInfoApexStyles } sx={ { alignSelf: "center" } }>
                        <InfoTitle>{ title }</InfoTitle>
                        <InfoSubtitle sx={ { textAlign: 'end', fontWeight: 'bold' } }>{ subtitle }</InfoSubtitle>
                    </Info>
                </Box>
                <Box
                    pb={ 0.5 }
                    px={ 1 }
                    color={ "primary.dark" }
                    fontSize={ "1rem" }
                    fontFamily={ "Ubuntu" }
                    flexGrow={ 1 }
                    textAlign={ 'center' }
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
                    <Stack direction={ 'row' } justifyContent={ 'space-between' }>

                        <ButtonGroup size="small" orientation="vertical" fullWidth variant={ "contained" }>

                            <ButtonJoin

                                color='primary'
                                LinkComponent={ Link }
                                href={ pathname + `/${event.id}` }
                                startIcon={ <OpenWithOutlinedIcon /> }>
                                Открыть
                            </ButtonJoin>
                            <ButtonJoin
                                startIcon={ <SettingsTwoTone /> }
                                color="primary"
                                LinkComponent={ Link }
                                href={ pathname + `/${event.id}/edit` }

                            >
                                Править
                            </ButtonJoin>
                        </ButtonGroup>
                        {/* <IconButton color="secondary" LinkComponent={ Link } href={ pathname + `/${event.id}/edit` }>
                            <SvgIcon>

                            </SvgIcon>
                        </IconButton> */}
                    </Stack>

                </Box>
            </ColumnCard>
        </DivRoot>
    )
};