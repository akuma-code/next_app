'use client'

import { _log } from "@/Helpers/helpersFns";
import { Button, ButtonGroup, Stack, TextField, Typography } from "@mui/material";
import React, { useActionState } from "react";
import BackButton from "../UI/BackButton";
import { Container } from "@mui/material";
import { useFormState } from "react-dom";
import { login } from "@/auth/login";

import { authenticate } from "./authFn";
import { signIn } from "@/auth/auth";
import { redirect } from "next/navigation";
// import { signIn } from "next-auth/react";



export function CredentialsInputs() {
    // const [errorMsg, action, isPending] = useActionState(authenticate, { message: "" })

    return (
        // <form
        //     action={ (formdata) => action(formdata) }
        // >


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
                required
            // error={ !!errorMsg?.message }
            // helperText={ errorMsg?.message }
            />

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
                label="Пароль"
            // error={ !!errorMsg?.message }
            // helperText={ errorMsg?.message }
            />
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

        // </form>
    );
}

// export const CredentialsLoginForm = ({ provider }: { provider: { id: string, name: string } }) => {

//     const [error, dispatch] = useFormState(authenticate, { message: "", callbackUrl: "" })

//     // async function onFinish(prev: any, data: FormData) {
//     //     return await login(prev, data).then(
//     //         res => {
//     //             error && router.push("/")
//     //             console.log(res)
//     //             return res
//     //         },
//     //         err => {
//     //             _log(err)
//     //             return { message: "Login error, check pass or email" }

//     //         }
//     //     )
//     // }
//     return (
//         <form key={ provider.id }
//             action={ dispatch }
//         // { async (fd) => {
//         //     "use server"
//         //     try {
//         //         await signIn(provider.id, fd)
//         //     } catch (error) {
//         //         console.log(Object.fromEntries(fd))

//         //         _log(error)
//         //         throw error
//         //     }
//         // } }
//         >



//             <Stack rowGap={ 2 } sx={ { bgcolor: 'background.paper', p: 2, maxWidth: 400, border: '1px solid black', borderRadius: '1rem' } } >
//                 <Typography>Авторизация</Typography>
//                 <TextField
//                     sx={ { flexGrow: 1 } }
//                     defaultValue={ "" }
//                     name='email'
//                     color='warning'
//                     id='inp-email'
//                     size='small'
//                     placeholder='введите email'
//                     type='email'
//                     label="Email"
//                     required
//                     error={ !!error?.message }
//                     helperText={ error?.message }
//                 />

//                 <TextField
//                     sx={ { flexGrow: 1, } }
//                     defaultValue={ "" }
//                     name='password'
//                     color='warning'
//                     id='passinput'
//                     type='password'
//                     autoComplete='on'
//                     size='small'
//                     placeholder='введите пароль'
//                     required
//                     label="Пароль"
//                     error={ !!error?.message }
//                 // helperText={ error.message }
//                 />
//                 <ButtonGroup fullWidth>

//                     <Button type="submit" variant="contained">
//                         Войти
//                     </Button>
//                     <Button type="reset">
//                         Сбросить
//                     </Button>
//                     <BackButton />
//                 </ButtonGroup>

//             </Stack>
//             { error &&
//                 <div>{ error.message }</div>
//             }
//         </form>
//     );
// }