'use client'
import { profileIcons } from "@/Components/Icons/mdi/ProfileIcons"
import { createPlayer } from "@/Services/playerService"
import { changeUserImage, linkUserToPlayer } from "@/Services/profileService"
import { editUser, getUserByName } from "@/Services/userService"
import { P_UserAndProfile } from "@/Types"
import { mdiCheck, mdiFormTextboxPassword, mdiLink, mdiReply } from "@mdi/js"
import Icon from '@mdi/react'
import { Box, Button, ButtonGroup, Card, CardContent, CardHeader, Grid, IconButton, List, ListItem, ListItemButton, ListItemSecondaryAction, ListItemText, Paper, Popover, Stack, TextField, Typography } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import { ChangeIconDialog } from "./ChangeIconDialog"
type UserProfileProps = {
    user: P_UserAndProfile | null
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
    const { mutateAsync: linkUser } = useMutation({
        mutationKey: ['link', user?.id, user?.profile?.id],
        mutationFn: linkUserToPlayer,
        gcTime: 5000
    });


    if (!user) return null
    const { email, id, image, name, role, password, profile } = user;
    async function linkWithUserName(user_name: string) {
        let player_id: null | number = null
        const player = await getUserByName(user_name)
        if (player) player_id = player.id
        else {
            const new_player = await createPlayer(user_name)
            player_id = new_player.id
        }
        return await linkUser({ user_id: id, player_id })
    }
    async function handleLink() {

        if (name) {
            await linkWithUserName(name)
            return
        } else {
            alert("Нужно ввести имя!")
            return
        }


    }

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
            <Box direction={ 'row' } justifyContent={ 'space-around' } component={ Stack } alignItems={ 'center' }>

                <CardHeader
                    title={ `Profile Id: ${user?.id}` }
                    titleTypographyProps={ { color: 'primary.contrastText' } }
                    subheader={ user.profile?.name }
                    subheaderTypographyProps={ { color: 'primary.contrastText' } }
                />
                <Box mt={ 1 }>
                    { currentImage &&
                        <Icon

                            { ...currentImage }
                            aria-labelledby={ `icon_labeledby_${index}` }
                            color="#fff"
                            size={ 3 }

                        />
                    }

                    <Typography color="secondary">{ img || "no title" }</Typography>
                </Box>

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
                    <Grid item md={ 10 } border={ '2px solid white' } p={ 1 }>
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

                                {/* <ListItemButton
                                    color="success"
                                    sx={ { flexGrow: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }
                                    }
                                    title="Изменить пароль учетной записи"
                                    divider>

                                    <ListItemText
                                        primary={ "Изменить пароль" }
                                    />
                                    <Icon path={ mdiFormTextboxPassword } color={ 'grey' } size={ 1.3 } />
                                </ListItemButton> */}
                                <ListItem divider dense>
                                    <Stack gap={ 1 } direction={ 'row' } justifyContent={ 'space-between' }>

                                        <ListItemText
                                            primary={ "Пароль" }
                                            secondary={ "пароль учетной записи" }
                                        // secondaryTypographyProps={ { fontSize: 10 } }
                                        // primaryTypographyProps={ { textAlign: 'left' } }
                                        />
                                        <ListItemSecondaryAction>

                                            <EditPopoverButton
                                                input={ { type: 'password', value: password } }
                                                action={ handleSubmit }

                                            />
                                        </ListItemSecondaryAction>
                                    </Stack>
                                </ListItem>
                                { user.profile?.playerId
                                    ? <ListItem divider alignItems="center" dense>
                                        <ListItemText primary={ "Профиль уже связан!" } secondary={ `Id игрока: ${user.profile.playerId}` } />
                                    </ListItem>

                                    : <ListItemButton
                                        onClick={ () => handleLink() }
                                        color="success"
                                        sx={ { flexGrow: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' } }
                                        title="Привязать учетку к игроку"
                                        divider>
                                        <ListItemText
                                            primary={ "Привязать профиль" }
                                        />
                                        <Icon path={ mdiLink } color={ 'green' } size={ 1.3 } />
                                    </ListItemButton>
                                }


                            </List>

                        </Paper>

                    </Grid>





                    <Grid item md={ 10 } border={ '2px solid white' } p={ 1 } spacing={ 2 } direction={ 'column' } display={ 'flex' } gap={ 2 }>

                        <ChangeIconDialog btn_title="Icons" icons={ [...profileIcons] } selectIcon={ handleSelect } />

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
    customBtn?: { element: React.ReactNode, props?: any, icon?: React.ReactNode }
    action: (formData: FormData) => void
}
export const EditPopoverButton: React.FC<EditPopoverProps> = ({ input, action, customBtn }) => {
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
        <>{
            customBtn ?
                <Button
                    fullWidth
                    title="check"
                    endIcon={ customBtn.icon }
                    onClick={ handleOpen }
                    size="small"
                    { ...customBtn.props }
                >
                    { customBtn.element }
                </Button>
                :
                <IconButton
                    title="check"
                    color="secondary"
                    sx={ { bgcolor: "lightblue", ml: 1 } }
                    edge='end'
                    onClick={ handleOpen }
                    size="small">
                    <Icon path={ mdiFormTextboxPassword } size={ 1 } />
                </IconButton>
        }


            <Popover open={ show } onClose={ handleClose } anchorEl={ anchorEl }
                anchorOrigin={ {
                    vertical: 'top',
                    horizontal: 'right',
                } }
                transformOrigin={ {
                    vertical: 'bottom',
                    horizontal: 'center',
                } }
                slotProps={ {
                    paper: {
                        elevation: 1,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: -2,

                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                bottom: 0,
                                left: 180,
                                width: 20,
                                height: 20,
                                bgcolor: 'background.paper',
                                transform: 'translateY(50%) rotate(135deg)',
                                zIndex: 0,
                            },

                        }
                    },
                } }
            >


                <Box

                    m={ 1 }
                    p={ 2 }

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