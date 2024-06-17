'use client';


import { registerAction } from '@/auth/register';
import { Button, Stack, TextField } from '@mui/material';
import { UserRole } from '@prisma/client';
import { useFormState, useFormStatus } from 'react-dom';





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
export default function LoginForm() {
    const [error, dispatch] = useFormState(registerAction, undefined)

    return (
        <form
            action={ dispatch }

            className="space-y-3" name='loginform' id={ 'loginform' }>

            <div className="flex-1 rounded-lg bg-gray-50 ">


                <Stack rowGap={ 2 } sx={ { bgcolor: 'background.paper', p: 1 } }>

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



                    <RegisterButton />
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
            sx={ { m: 2 } }
            disabled={ pending }
            type='submit'
        >
            Зарегестрироваться
        </Button>
    );
}