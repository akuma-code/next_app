'use client'

import { Button, ButtonGroup, Divider, ListItem, ListItemButton, Stack, TextField, Typography } from "@mui/material";
import BackButton from "../UI/BackButton";
import Link from "next/link";
import SubmitButton from "../UI/SubmitButton";
import { NavLink } from "../UI/NavLink";

// import { signIn } from "next-auth/react";



export function CredentialsInputs() {
    // const [errorMsg, action, isPending] = useActionState(authenticate, { message: "" })

    return (
        // <form
        //     action={ (formdata) => action(formdata) }
        // >


        <Stack rowGap={ 2 } sx={ { bgcolor: 'background.paper', p: 2, maxWidth: 600, border: '1px solid black', borderRadius: '1rem' } } >
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
            <NavLink
                href={ "/api/auth/register" }
                label="Регистрация нового пользователя"
                props={ { variant: 'text', sx: { bgcolor: 'secondary', fontSize: 12, textDecoration: 'underline' } } }
            />

            <ButtonGroup fullWidth variant="outlined">


                <SubmitButton label="Войти" buttonProps={ { variant: 'contained' } } />


                <BackButton color="warning" variant="contained" />

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