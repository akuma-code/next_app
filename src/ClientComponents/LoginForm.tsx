'use client';


import { authenticate } from '@/app/lib/actions';
import { Button, Divider, InputLabel, SvgIcon, TextField } from '@mui/material';
import { useFormState, useFormStatus } from 'react-dom';

import MemoAdeptusMechanicus from '../../public/assets/AdeptusMechanicus';

import { apiUrl, pageUrl } from '@/paths';
import { redirect } from 'next/dist/server/api-utils';
import { signIn } from '../../auth';
import { useSession } from 'next-auth/react';
import { DatePicker } from '@mui/x-date-pickers';


type FormState = {
    nickname: string
    password: string
    error?: string | null
} | undefined

const initalState: FormState = {
    nickname: "",
    password: "",
}
export default function LoginForm() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    return (
        <form
            action={ dispatch }

            className="space-y-3" name='loginform' id={ 'loginform' }>

            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                <div className="flex justify-between">

                    <SvgIcon sx={ { transform: 'scale(1.7)', m: 1 } }><MemoAdeptusMechanicus fontSize={ 25 } /></SvgIcon>
                    <h1 className={ ` mb-3 text-2xl text-center` }>
                        Авторизация

                    </h1>
                    <SvgIcon sx={ { transform: 'scale(1.7)', m: 1 } }><MemoAdeptusMechanicus fontSize={ 25 } /></SvgIcon>
                </div>
                <Divider sx={ { my: 1 } } />
                <div className="w-full flex flex-col space-y-2">
                    <div className='flex  mb-2 justify-between'>

                        <TextField
                            sx={ { flexGrow: 1, maxWidth: '60%' } }
                            defaultValue={ "" }
                            name='nickname'
                            color='warning'
                            id='inputname'
                            size='small'
                            placeholder='введите имя'
                            type='text'
                            required

                        />
                        <InputLabel
                            htmlFor='inputname'

                            sx={ {
                                alignSelf: 'center',
                                textTransform: 'capitalize',
                                fontSize: 20,
                                flexGrow: 1,
                                textAlign: 'right',
                                px: 3,
                                color: 'white'
                            } }
                        >
                            Имя
                        </InputLabel>

                    </div>
                    <div className="mt-4 flex ">

                        <TextField
                            sx={ { flexGrow: 1, maxWidth: '60%', color: 'white' } }
                            defaultValue={ "" }
                            name='password'
                            color='warning'
                            id='passinput'
                            type='password'
                            autoComplete='on'
                            size='small'
                            placeholder='введите пароль'
                            required
                        />
                        <InputLabel htmlFor='passinput'
                            sx={ {
                                alignSelf: 'center',
                                textTransform: 'capitalize',
                                fontSize: 20,
                                flexGrow: 1,
                                textAlign: 'right',
                                px: 3,
                                color: 'white'
                            } }
                        >
                            Пароль
                        </InputLabel>

                    </div>
                </div>


                <div
                    className="flex h-8 items-end space-x-1 p-1"
                    aria-live="polite"
                    aria-atomic="true"
                >

                    { errorMessage && (
                        <>
                            {/* <ExclamationCircleIcon className="h-5 w-5 text-red-500" /> */ }
                            <p className="text-sm text-red-500">{ errorMessage.message }</p>
                        </>
                    ) }
                </div>

                <LoginButton />
                <RegisterButton />

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
            sx={ { py: 1, m: 2 } }
            disabled={ pending }
        >
            Register
        </Button>
    );
}