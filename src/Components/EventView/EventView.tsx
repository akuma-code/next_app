'use client'

import { IEvent_Front, avatarColor } from "@/ClientComponents/EventsList"
import LinkMui from "@/ClientComponents/UI/LinkMui"
import { _dbDateParser } from "@/Helpers/dateFuncs"
import { name_letters } from "@/Helpers/stringFns"
import { TopUsersCardMockup } from "@/mui-treasury/mockup-dashboard"
import { Circle } from "@/mui-treasury/mockup-shape"
import { FastRewindTwoTone, KeyboardArrowLeftTwoTone } from "@mui/icons-material"
import { Avatar, Box, BoxProps, Button, ButtonGroup, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material"
import { useRouter } from "next/navigation"
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import DoNotDisturbOnTwoToneIcon from '@mui/icons-material/DoNotDisturbOnTwoTone';
import { EventViewEditDialog } from "./EventViewEditDialog"
import { deleteEvent } from "@/Services/eventService"
interface Eventinfo {
    boxProps?: BoxProps
    event: IEvent_Front
    readonly?: boolean
}
export const EventView: React.FC<Eventinfo> = ({ boxProps, event, readonly = true }) => {
    const router = useRouter()
    const { players, date_formated, title, _count } = event
    const { dd_mmmm, dd_mm_yyyy } = _dbDateParser(date_formated);

    const handleDelete = async (id: number) => {
        if (confirm("Delete event?")) {
            await deleteEvent(id)
            router.back()
        }
    }
    return (
        <Box
            { ...boxProps }
            sx={ {
                borderRadius: 4,
                minWidth: 280,
                border: "1px solid",
                borderColor: 'lightgray',
                bgcolor: "background.paper",
                boxShadow: "0 2px 6px 0 rgba(0,0,0,0.08)",
                ...boxProps?.sx,
            } }
        >
            <Box sx={ { display: "flex", p: 1.5, alignItems: "center", columnGap: 1, justifyContent: 'space-evenly' } }>

                <Box>
                    <Typography variant="body1" fontSize={ 18 } fontWeight={ 'bold' }>{ dd_mm_yyyy }</Typography>
                </Box>
                <Avatar variant="rounded"
                    sx={ { mt: 0.5, mb: 0, bgcolor: avatarColor(_count?.players || 0) } }
                >
                    { _count?.players }
                </Avatar>
            </Box>
            <Divider sx={ { justifyContent: 'left' } } flexItem>
                <ButtonGroup>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={ () => router.back() }

                        startIcon={ <FastRewindTwoTone /> }>
                        Назад
                    </Button>

                    <EventViewEditDialog event={ event } />
                    <Button color='warning' size="small"
                        onClick={ () => handleDelete(event.id) }>Delete</Button>
                </ButtonGroup>
            </Divider>
            <List>
                {
                    players.map((p, index) => (
                        <ListItem key={ index } sx={ { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' } }>
                            <ListItemAvatar >
                                <Avatar sizes="sm">{ name_letters(p.name) }</Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={ p.name } />
                            { readonly === false &&
                                <IconButton edge={ 'end' } >
                                    <DoNotDisturbOnTwoToneIcon sx={ { width: 28, height: 28 } } />
                                </IconButton>
                            }
                        </ListItem>
                    ))
                }
            </List>
        </Box>
    )
}

EventView.displayName = "______EventIdView"