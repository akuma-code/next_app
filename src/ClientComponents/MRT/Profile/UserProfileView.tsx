'use client'
import { profileIcons } from "@/Components/Icons/mdi/ProfileIcons"
import { changeUserImage } from "@/Services/profileService"
import Icon from '@mdi/react'
import { Box, Button, Card, CardContent, CardHeader, FormControl, FormControlLabel, FormHelperText, Grid, IconButton, InputBase, List, ListItem, ListItemSecondaryAction, ListItemText, OutlinedInput, Paper, Stack, TextField, Typography } from "@mui/material"
import { Prisma } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import { ChangeIconDialog } from "./ChangeIconDialog"
import { mdiAccountEdit, mdiCheck, mdiLinkEdit, mdiPencil, mdiTagEdit } from "@mdi/js"
type UserProfileProps = {
    user: Prisma.$UserPayload['scalars'] | null
}


export const UserProfileView: React.FC<UserProfileProps> = ({ user }) => {
    // const [profile, setProfile] = useState()
    const [index, setIndex] = useState(0)
    // const currentImageTitle = useMemo(() => profileIcons[index].title, [index])
    const [img, setImg] = useState(user?.image ?? "")
    const currentImage = useMemo(() => profileIcons.find(i => i.title === img), [img])
    const { data: db_user, error, isSuccess, mutateAsync } = useMutation({
        mutationKey: ['profileId', user?.id],
        mutationFn: changeUserImage,
        gcTime: 5000
    })
    async function handleSelect(id: number) {
        if (!user) return
        setIndex(prev => id)
        setImg(prev => profileIcons[id].title)
        await mutateAsync({ id: user.id, image: img })

    }



    if (!user) return null
    const { email, id, image, name, role, password } = user;
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
                    columns={ { xs: 8, md: 10 } }
                    direction={ 'row' }
                    justifyContent={ 'stretch' }
                >
                    <Grid item md={ 6 } border={ '2px solid white' } p={ 1 }>
                        <Paper>
                            <List disablePadding sx={ { pr: 1 } }>
                                <ListItem divider>
                                    <Stack gap={ 1 } direction={ 'row' } justifyContent={ 'space-between' }>

                                        <ListItemText
                                            primary={ email }
                                            secondary="Email"
                                            sx={ { width: 'fit-content' } }
                                        />

                                        <ListItemSecondaryAction >
                                            <IconButton title="check" color="secondary" sx={ { bgcolor: "lightblue", ml: 1 } } edge='end'>
                                                <Icon path={ mdiPencil } size={ .7 } />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </Stack>
                                </ListItem>
                                <ListItem divider>
                                    <Stack gap={ 1 } direction={ 'row' } justifyContent={ 'space-between' }>

                                        <ListItemText
                                            primary={ name }
                                            secondary="name"
                                            sx={ { width: 'fit-content' } }
                                        />

                                        <ListItemSecondaryAction >
                                            <IconButton title="check" color="secondary" sx={ { bgcolor: "lightblue", ml: 1 } } edge='end'>
                                                <Icon path={ mdiPencil } size={ .7 } />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </Stack>
                                </ListItem>
                                <ListItem divider>
                                    <Stack gap={ 1 } direction={ 'row' } justifyContent={ 'space-between' }>

                                        <ListItemText
                                            primary={ role }
                                            secondary="role"
                                            sx={ { width: 'fit-content' } }
                                        />

                                        <ListItemSecondaryAction >
                                            <IconButton title="check" color="secondary" sx={ { bgcolor: "lightblue", ml: 1 } } edge='end'>
                                                <Icon path={ mdiPencil } size={ .7 } />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </Stack>
                                </ListItem>
                            </List>
                        </Paper>
                        {/* 
                            <FormControl >

                                <TextField color="warning"
                                id="email"
                                name="email"
                                defaultValue={ email }
                                variant="filled"
                                label="Email"
                                helperText="Change email"
                                InputProps={ {
                                    endAdornment: <IconButton title="check" color="secondary" sx={ { bgcolor: "lightblue" } }><Icon path={ mdiCheck } size={ 1 } /> </IconButton>
                                } }

                            /> 
                            </FormControl>
                            */}

                        {
                            // user && Object.entries(user).map(([k, v]) => {

                            //     if (typeof v === 'string' || typeof v === 'number')
                            //         return <Typography color={ 'primary.contrastText' } key={ v }>{ k }: { v }</Typography>
                            // })
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
                    <Grid item md={ 10 } border={ '2px solid white' } p={ 1 } spacing={ 2 } direction={ 'column' } display={ 'flex' } gap={ 2 }>
                        {/* <ButtonGroup size="small" color="warning" fullWidth orientation="vertical"> */ }

                        {/* <Button variant="outlined" color="warning" size="small">Change Pass</Button> */ }
                        {/* <Button variant="outlined" color="warning" size="small">Change Name</Button> */ }
                        <ChangeIconDialog btn_title="Icons" icons={ profileIcons } selectIcon={ handleSelect } />
                        {/* </ButtonGroup> */ }

                    </Grid>
                </Grid>






            </CardContent>


        </Card>
    )
}

UserProfileView.displayName = "___UserProfile"