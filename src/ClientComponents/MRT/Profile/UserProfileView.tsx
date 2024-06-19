'use client'
import { Avatar, Box, Button, ButtonGroup, Card, CardActions, CardContent, CardHeader, Container, createSvgIcon, Stack, SvgIcon, Typography, Grid } from "@mui/material"
import { Prisma } from "@prisma/client"
import { useCallback, useState } from "react"
import Xenos from '@/Components/Icons/svg/Xenos'
import Mym from '@/Components/Icons/svg/Mymeara.svg'
import Image from "next/image"
import Icon from '@mdi/react';
import { mdiAccount, mdiAccountHardHatOutline, mdiAccountBoxOutline, mdiAccountHeartOutline } from '@mdi/js';

type UserProfileProps = {
    user: Prisma.$UserPayload['scalars'] | null
}

type ProfileIcon = {
    _id: number,
    title: string,
    path: string,
    size: number
}

const initIcons = [
    {
        _id: 1,
        title: "HardHat",
        path: mdiAccountHardHatOutline,
        size: 4
    },
    {
        _id: 2,
        title: "AccountBox",
        path: mdiAccountBoxOutline,
        size: 4
    },
    {
        _id: 3,
        title: "Accaunt heart",
        path: mdiAccountHeartOutline,
        size: 4
    },
    {
        _id: 4,
        title: "Default Accaunt",
        path: mdiAccount,
        size: 4
    },
]
export const UserProfileView: React.FC<UserProfileProps> = ({ user }) => {
    const [profile, setProfile] = useState(user)

    const [icons, setIcons] = useState<ProfileIcon[]>(initIcons)
    const [icon, setIcon] = useState<ProfileIcon>({
        _id: 4,
        title: "Default Accaunt",
        path: mdiAccount,
        size: 4
    })
    const [index, setIndex] = useState(0)
    const next = () => setIndex(prev => prev < icons.length - 1 ? prev + 1 : 0)
    const prev = () => setIndex(prev => prev > 0 ? prev - 1 : icons.length - 1)



    return (
        <Card sx={ { bgcolor: 'primary.main', maxWidth: 600 } }

        >
            <CardHeader
                title={ `Profile Id: ${profile?.id}` }
                titleTypographyProps={ { color: 'primary.contrastText' } }
            />

            <CardContent sx={ { m: 2 } }>
                <Grid
                    container
                    gridTemplateColumns={ 3 }
                    spacing={ 0 }
                    columns={ { xs: 8, md: 12 } }
                    direction={ 'row' }
                    justifyContent={ 'stretch' }
                >
                    <Grid item md={ 4 } border={ '2px solid white' } p={ 1 }>
                        {
                            profile && Object.entries(profile).map(([k, v]) => {

                                if (typeof v === 'string' || typeof v === 'number')
                                    return <Typography color={ 'primary.contrastText' } key={ v }>{ k }: { v }</Typography>
                            })
                        }
                    </Grid>
                    <Grid item
                        md={ 4 }
                        border={ '2px solid white' }
                        // p={ 1 }
                        display={ 'flex' }
                        justifyContent={ 'center' }
                        alignItems={ 'center' }
                        direction={ 'column' }
                    >{ icons[index] &&
                        <Icon
                            { ...icons[index] }
                            color="#fff"
                        /> }
                        <Typography color="secondary">{ icons[index]?.title || "no title" }</Typography>
                    </Grid>


                    <Grid item md={ 4 } border={ '2px solid white' } p={ 1 } spacing={ 2 } direction={ 'column' } display={ 'flex' } gap={ 2 }>
                        {/* <ButtonGroup size="small" color="warning" fullWidth orientation="vertical"> */ }
                        <ButtonGroup>

                            <Button variant="outlined" color="warning" onClick={ prev }>prev Image</Button>
                            <Button variant="outlined" color="warning" onClick={ next }>next Image</Button>
                        </ButtonGroup>
                        <Button variant="outlined" color="warning">Change Pass</Button>
                        <Button variant="outlined" color="warning">Change Name</Button>
                        {/* </ButtonGroup> */ }

                    </Grid>

                </Grid>






            </CardContent>
            {/* <CardActions>
                <ButtonGroup size="small" color="warning">
                    <Button variant="outlined">Change Image</Button>
                    <Button variant="outlined">Change Pass</Button>
                    <Button variant="outlined">Change Name</Button>
                </ButtonGroup>

            </CardActions> */}

        </Card>
    )
}

UserProfileView.displayName = "___UserProfile"