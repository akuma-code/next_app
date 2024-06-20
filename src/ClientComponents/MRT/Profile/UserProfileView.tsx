'use client'
import { Avatar, Box, Button, ButtonGroup, Card, CardActions, CardContent, CardHeader, Container, createSvgIcon, Stack, SvgIcon, Typography, Grid, Dialog, DialogContent } from "@mui/material"
import { Prisma, User } from "@prisma/client"
import { useCallback, useEffect, useMemo, useState } from "react"
import Xenos from '@/Components/Icons/svg/Xenos'
import Mym from '@/Components/Icons/svg/Mymeara.svg'
import Image from "next/image"
import Icon from '@mdi/react';
import {
    mdiAccount, mdiAccountHardHatOutline, mdiAccountBoxOutline, mdiAccountHeartOutline,
    mdiAccountCowboyHatOutline, mdiAccountGroupOutline, mdiAccountSupervisorCircleOutline, mdiAccountSchoolOutline, mdiAccountTieHatOutline
} from '@mdi/js';
import { UserPersonalData } from "@/Types"
import { useMutation, useQuery } from "@tanstack/react-query"
import { changeUserImage } from "@/Services/profileService"

type UserProfileProps = {
    user: Prisma.$UserPayload['scalars'] | null
}

type ProfileIcon = {
    // _id?: number,
    title: string,
    path: string,

}

const initIcons = [
    {

        title: "Default Accaunt",
        path: mdiAccount,

    },
    {

        title: "HardHat",
        path: mdiAccountHardHatOutline,

    },
    {

        title: "AccountBox",
        path: mdiAccountBoxOutline,

    },
    {

        title: "Accaunt heart",
        path: mdiAccountHeartOutline,

    },
    {

        title: "Cowboy",
        path: mdiAccountCowboyHatOutline,

    },
    {

        title: "Group",
        path: mdiAccountGroupOutline,

    },
    {

        title: "Supervisor",
        path: mdiAccountSupervisorCircleOutline,

    },
    {

        title: "School",
        path: mdiAccountSchoolOutline,

    },
    {

        title: "TieHat",
        path: mdiAccountTieHatOutline,

    },
]
export const UserProfileView: React.FC<UserProfileProps> = ({ user }) => {
    const [profile, setProfile] = useState(user)
    const [index, setIndex] = useState(0)
    if (!profile || !user) return null
    const currentImageTitle = useMemo(() => initIcons[index].title, [index])
    const [img, setImg] = useState(user.image ?? "")
    const currentImage = useMemo(() => initIcons.find(i => i.title === img), [img])
    const { data: db_user, error, isSuccess, mutateAsync } = useMutation({
        mutationKey: ['profileId', profile.id],
        mutationFn: changeUserImage,
        gcTime: 5000
    })
    function handleSelect(id: number) {
        if (!user) return
        setIndex(prev => id)
        setImg(initIcons[id].title)
        mutateAsync({ id: user.id, image: img })
        // console.table(data)
    }
    // useEffect(() => {
    //     const updated = { ...profile, image: currentImageTitle }
    //     setProfile(updated as typeof profile)
    // }, [index])
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
                    <Grid item md={ 5 } border={ '2px solid white' } p={ 1 }>
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
                    >
                        { currentImage &&
                            <Icon
                                { ...currentImage }
                                aria-labelledby={ `icon_labeledby_${index}` }
                                color="#fff"
                                size={ 4 }
                            />
                        }
                        <Typography color="secondary">{ img || "no title" }</Typography>
                    </Grid>


                    <Grid item md={ 3 } border={ '2px solid white' } p={ 1 } spacing={ 2 } direction={ 'column' } display={ 'flex' } gap={ 2 }>
                        {/* <ButtonGroup size="small" color="warning" fullWidth orientation="vertical"> */ }

                        <Button variant="outlined" color="warning">Change Pass</Button>
                        <Button variant="outlined" color="warning">Change Name</Button>
                        <ChangeIconDialog btn_title="Icons" icons={ initIcons } selectIcon={ handleSelect } />
                        {/* </ButtonGroup> */ }

                    </Grid>

                </Grid>






            </CardContent>


        </Card>
    )
}
type ChangeIconDProps = {
    btn_title: string,
    icons: { title: string, path: string, }[]
    selectIcon: (id: number) => void
}
const ChangeIconDialog: React.FC<ChangeIconDProps> = ({ btn_title, icons, selectIcon }) => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button color="secondary" variant="contained" onClick={ () => setOpen(true) }>{ btn_title }</Button>
            <Dialog open={ open }
                onClose={ () => setOpen(false) }
            >
                <DialogContent>
                    <Grid container
                        gap={ 1 }
                        // gridTemplateColumns={ 3 }
                        // gridTemplateRows={ 4 }
                        columns={ { xs: 12, md: 9 } }
                    >
                        { icons.map((i, idx) =>
                            <Grid item key={ i.title }
                                onClick={ () => selectIcon(idx) }
                                sx={ { border: '1px solid grey', cursor: 'pointer' } }
                                display={ 'flex' }
                                justifyContent={ 'center' }
                                alignItems={ 'center' }
                                direction={ 'column' }
                                sm={ 3 }
                                md={ 2 }
                            >

                                <Icon
                                    path={ i.path }
                                    size={ 4 }
                                    aria-labelledby={ `icon_labeledby_${idx}` }
                                />
                            </Grid>
                        ) }

                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    )
}


ChangeIconDialog.displayName = "____IconsDialog"
UserProfileView.displayName = "___UserProfile"