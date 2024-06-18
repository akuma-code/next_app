'use client'
import { signIn } from "@/auth/auth";
import { _log } from "@/Helpers/helpersFns";
import { Button, ButtonGroup, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import BackButton from "../UI/BackButton";
import { Container } from "@mui/material";
import { useFormState } from "react-dom";
import { login } from "@/auth/login";
import { useRouter } from "next/navigation";

export const CredentialsLoginForm = ({ provider }: { provider: { id: string, name: string } }) => {
    const [error, dispatch] = useFormState(onFinish, { message: "" })
    const router = useRouter()

    async function onFinish(prev: any, data: FormData) {
        return await login(prev, data).then(
            res => {
                router.push("/")
                console.table(res)
                return { message: "Success" }
            },
            err => {
                return { message: "Login error, check pass or email" }

            }
        )
    }
    return (
        <form key={ provider.id }
            action={ dispatch }
        // { async (fd) => {
        //     "use server"
        //     try {
        //         await signIn(provider.id, fd)
        //     } catch (error) {
        //         console.log(Object.fromEntries(fd))

        //         _log(error)
        //         throw error
        //     }
        // } }
        >



            <Stack rowGap={ 2 } sx={ { bgcolor: 'background.paper', p: 2, maxWidth: 400, border: '1px solid black', borderRadius: '1rem' } } >
                <Typography>Авторизация</Typography>
                <TextField
                    sx={ { flexGrow: 1 } }
                    defaultValue={ "" }
                    name='email'
                    color='warning'
                    id='inp-email'
                    size='small'
                    placeholder='введите email'
                    type='email'
                    label="Email"
                    required />

                <TextField
                    sx={ { flexGrow: 1, } }
                    defaultValue={ "" }
                    name='password'
                    color='warning'
                    id='passinput'
                    type='password'
                    autoComplete='on'
                    size='small'
                    placeholder='введите пароль'
                    required
                    label="Пароль" />
                <ButtonGroup fullWidth>

                    <Button type="submit" variant="contained">
                        Войти
                    </Button>
                    <Button type="reset">
                        Сбросить
                    </Button>
                    <BackButton />
                </ButtonGroup>

            </Stack>
            { error &&
                <div>{ error.message }</div>
            }
        </form>
    );
}