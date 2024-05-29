'use client'

import { Button, ButtonGroup, Stack, TextField, Typography } from "@mui/material"
import { checkAuth, loginAuth, logout } from "./clientAuth"
import { _promptVar } from "@/Helpers/helpersFns"
import SubmitButton from "./UI/SubmitButton"
import ResetButton from "./UI/ResetButton"
import { useMemo, useState } from "react"

export const Auth = () => {
    const auth = checkAuth()
    const authText = useMemo(() => { return auth ? 'авторизован' : "не авторизован" }, [auth])
    const [pass, setPass] = useState("")
    const handleAuth = () => {
        loginAuth(pass)
        setPass("")
    }
    return (
        <Stack spacing={ 2 } sx={ { pt: 1 } }>
            <Typography variant="h5" component={ 'div' }>Пользователь { authText }</Typography>
            <TextField
                size={ 'small' }
                helperText="Введите пароль"
                value={ pass }
                onChange={ (e) => setPass(e.target.value) }
                name="password" />
            <ButtonGroup variant="contained" fullWidth>
                <Button onClick={ handleAuth } disabled={ auth }>Login</Button>

                <Button onClick={ logout } disabled={ !auth }>Logout</Button>
            </ButtonGroup>



            {/* <SubmitButton />
                <ResetButton /> */}


        </Stack>
    )
}