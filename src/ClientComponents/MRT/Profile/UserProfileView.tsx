'use client'
import { profileIcons } from "@/Components/Icons/mdi/ProfileIcons"
import { changeUserImage } from "@/Services/profileService"
import { mdiCheck, mdiClose, mdiFormTextboxPassword, mdiLink, mdiPencil, mdiReply } from "@mdi/js"
import Icon from '@mdi/react'
import { Box, Button, ButtonGroup, Card, CardContent, CardHeader, Grid, IconButton, List, ListItem, ListItemButton, ListItemSecondaryAction, ListItemText, Paper, Popover, Stack, SvgIcon, TextField, Typography } from "@mui/material"
import { Prisma } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import { ChangeIconDialog } from "./ChangeIconDialog"
import { editUser } from "@/Services/userService"
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


    if (!user) return null
    const { email, id, image, name, role, password } = user;


    async function handleSelect(id: number) {
        if (!user) return
        setIndex(prev => id)
        setImg(prev => profileIcons[id].title)
        await mutateAsync({ id: user.id, image: img })

    }

    const handleSubmit = async (formdata: FormData) => {
        const new_data = Object.fromEntries(formdata)
        const editAction = editUser.bind(null, { id }, { ...new_data })

        await editAction()


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
                    columns={ { xs: 8, md: 10 } }
                    direction={ 'row' }
                    justifyContent={ 'stretch' }
                >
                    <Grid item md={ 6 } border={ '2px solid white' } p={ 1 }>
                        <Paper>



                            <List sx={ { px: 2 } }>
                                <ListItem divider>
                                    <Stack gap={ 1 } direction={ 'row' } justifyContent={ 'space-between' }>

                                        <ListItemText
                                            primary={ email }
                                            secondary="Email пользователя"
                                            sx={ { width: 'fit-content' } }
                                        />

                                        <ListItemSecondaryAction >

                                            <EditPopoverButton input={ { type: "email", value: email } } action={ handleSubmit } />
                                        </ListItemSecondaryAction>
                                    </Stack>
                                </ListItem>
                                <ListItem divider>
                                    <Stack gap={ 1 } direction={ 'row' } justifyContent={ 'space-between' }>

                                        <ListItemText
                                            primary={ name }
                                            secondary="Имя пользователя"
                                            sx={ { width: 'fit-content' } }
                                        />

                                        <ListItemSecondaryAction >

                                            <EditPopoverButton input={ { type: "name", value: name } } action={ handleSubmit } />
                                        </ListItemSecondaryAction>
                                    </Stack>
                                </ListItem>

                                <ListItemButton
                                    color="success"
                                    sx={ { flexGrow: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }
                                    }
                                    title="Изменить пароль учетной записи"
                                    divider>
                                    <ListItemText
                                        primary={ "Изменить пароль" }
                                    />
                                    <Icon path={ mdiFormTextboxPassword } color={ 'grey' } size={ 1.3 } />
                                </ListItemButton>
                                <ListItemButton
                                    color="success"
                                    sx={ { flexGrow: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' } }
                                    title="Привязать учетку к игроку"
                                    divider>
                                    <ListItemText
                                        primary={ "Привязать профиль" }
                                    />
                                    <Icon path={ mdiLink } color={ 'green' } size={ 1.3 } />
                                </ListItemButton>


                            </List>

                        </Paper>

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

                        <ChangeIconDialog btn_title="Icons" icons={ profileIcons } selectIcon={ handleSelect } />

                    </Grid>
                </Grid>






            </CardContent>


        </Card>
    )
}

export type EditPopoverProps = {
    input: {
        value: string | null
        type: string
    }

    action: (formData: FormData) => void
}
export const EditPopoverButton: React.FC<EditPopoverProps> = ({ input, action }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [state, setState] = useState(input)


    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);


    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    function handleClickOnFinish() {
        const data = new FormData()
        const v = typeof state.value === 'string' ? state.value : JSON.stringify(state.value)
        data.append(state.type, v)
        action(data)
        handleClose()
    }

    function handleReset() {
        setState(prev => input)
    }
    const show = Boolean(anchorEl)
    return (
        <>
            <IconButton title="check" color="secondary" sx={ { bgcolor: "lightblue", ml: 1 } } edge='end' onClick={ handleOpen }>
                <Icon path={ mdiPencil } size={ .7 } />
            </IconButton>


            <Popover open={ show } onClose={ handleClose } anchorEl={ anchorEl }
                anchorOrigin={ {
                    vertical: 'top',
                    horizontal: 'right',
                } }
                transformOrigin={ {
                    vertical: 'bottom',
                    horizontal: 'center',
                } }

            >


                <Box

                    m={ 1 }
                    p={ 2 }

                    // component={ Paper }
                    // elevation={ 2 }
                    display={ 'flex' }
                    alignItems={ 'start' }
                    flexDirection={ 'row' }
                    gap={ 1 }

                >

                    <TextField
                        size="small"
                        name={ state.type }
                        value={ state.value }
                        onChange={ (e) => setState(prev => ({ ...prev, value: e.target.value })) }
                        variant="outlined"
                        label={ `Введите ${state.type}` }
                    />
                    <ButtonGroup sx={ { pt: 0 } } size="large">

                        <Button color="warning" sx={ { bgcolor: 'success.main' } } type="submit" onClick={ handleClickOnFinish } title="Подтвердить">
                            <Icon path={ mdiCheck } size={ 1 } color={ "success" } />
                        </Button>
                        <Button type="reset" sx={ { bgcolor: 'error.main' } } onClick={ handleReset } title="Вернуть начальное значение">
                            <Icon path={ mdiReply } size={ 1 } color={ "#000" } />
                        </Button>
                    </ButtonGroup>
                </Box>

            </Popover>

        </>
    )
}


UserProfileView.displayName = "___UserProfile"