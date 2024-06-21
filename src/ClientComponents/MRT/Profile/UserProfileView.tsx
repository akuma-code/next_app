'use client'
import { profileIcons } from "@/Components/Icons/mdi/ProfileIcons"
import { changeUserImage } from "@/Services/profileService"
import Icon from '@mdi/react'
import { Box, Button, Card, CardContent, CardHeader, Dialog, DialogContent, Grid, Stack, Typography } from "@mui/material"
import { Prisma } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { useMemo, useState } from "react"
type UserProfileProps = {
    user: Prisma.$UserPayload['scalars'] | null
}

type ProfileIcon = {
    // _id?: number,
    title: string,
    path: string,

}


export const UserProfileView: React.FC<UserProfileProps> = ({ user }) => {
    // const [profile, setProfile] = useState()
    const [index, setIndex] = useState(0)
    if (!user) return null
    // const currentImageTitle = useMemo(() => profileIcons[index].title, [index])
    const [img, setImg] = useState(user.image ?? "")
    const currentImage = useMemo(() => profileIcons.find(i => i.title === img), [img])
    const { data: db_user, error, isSuccess, mutateAsync } = useMutation({
        mutationKey: ['profileId', user.id],
        mutationFn: changeUserImage,
        gcTime: 5000
    })
    async function handleSelect(id: number) {
        if (!user) return
        setIndex(prev => id)
        setImg(prev => profileIcons[id].title)
        await mutateAsync({ id: user.id, image: img })

    }

    return (
        <Card sx={ { bgcolor: 'primary.main', maxWidth: 600 } }

        >
            <Box direction={ 'row' } justifyContent={ 'space-around' } component={ Stack } alignItems={ 'flex-start' }>

                <CardHeader
                    title={ `Profile Id: ${user?.id}` }
                    titleTypographyProps={ { color: 'primary.contrastText' } }
                />


            </Box>
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
                            user && Object.entries(user).map(([k, v]) => {

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
                        <ChangeIconDialog btn_title="Icons" icons={ profileIcons } selectIcon={ handleSelect } />
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
                                sx={ { border: '1px solid grey', cursor: 'pointer', p: 1 } }
                                display={ 'flex' }
                                justifyContent={ 'center' }
                                alignItems={ 'center' }
                                direction={ 'column' }
                                sm={ 3 }
                                md={ 2 }
                            >

                                <Icon
                                    title={ i.title }
                                    path={ i.path }
                                    size={ 4 }
                                    aria-labelledby={ `icon_labeledby_${idx}` }
                                />
                                { i.title }
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