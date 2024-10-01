'use client';


import { registerAction } from '@/auth/register';
import { Box, Button, ButtonGroup, Stack, TextField, Typography } from '@mui/material';
import { UserRole } from '@prisma/client';
import { useFormState, useFormStatus } from 'react-dom';
import BackButton from './UI/BackButton';





type FormState = {
    email: string
    password: string
    role: UserRole
}

const initalState: FormState = {
    email: "",
    password: "",
    role: UserRole.GUEST
}
export default function RegisterForm() {
    const [error, dispatch] = useFormState(registerAction, { message: "" })

    return (
        <form
            action={ dispatch }

            className="space-y-3" name='loginform' id={ 'loginform' }>

            <div className="flex-1 rounded-lg bg-gray-50 ">

                <Stack rowGap={ 2 }
                    sx={ {
                        bgcolor: 'background.paper',
                        p: 2,
                        maxWidth: 400,
                        border: '1px solid black',
                        borderRadius: '1rem'
                    } }>
                    <Typography>Регистрация нового пользователя</Typography>

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

                    />
                    <TextField
                        sx={ { flexGrow: 1 } }
                        defaultValue={ "" }
                        name='name'
                        color='warning'
                        id='inp-name'
                        size='small'
                        placeholder='введите имя'
                        type='text'
                        label="Name"
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
                    />


                    <ButtonGroup fullWidth>

                        <RegisterButton />
                        <BackButton />
                    </ButtonGroup>

                </Stack>


                <div
                    className="flex h-8 items-end space-x-1 p-1"
                    aria-live="polite"
                    aria-atomic="true"
                >

                    {
                        error &&
                        <p className="text-sm text-red-500">{ error.message }</p>
                    }
                </div>




            </div>
        </form>
    );
}

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <Button aria-disabled={ pending } variant='contained' color={ pending ? 'info' : 'success' } sx={ { py: 1, m: 2 } } type='submit' disabled={ pending }>
            Log in
        </Button>
    );
}
function RegisterButton() {
    const { pending } = useFormStatus();

    return (
        <Button aria-disabled={ pending }
            variant='contained'
            color='secondary'
            // sx={ { m: 2 } }
            disabled={ pending }
            type='submit'
        >
            Зарегестрироваться
        </Button>
    );
}