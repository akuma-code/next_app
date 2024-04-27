'use client';


import { authenticate, register } from '@/app/lib/actions';
import { Button, Divider, InputLabel, SvgIcon, TextField } from '@mui/material';
import { useFormState, useFormStatus } from 'react-dom';

import MemoAdeptusMechanicus from '../../public/assets/AdeptusMechanicus';
import { UserRoles } from '@prisma/client';


type FormState = {
    nickname: string
    password: string
    error?: string | null
    role?: UserRoles
    id?: string
}

const initalState: FormState = {
    nickname: "",
    password: "",
    // id?: "",
    error: null,
    role: 'guest'
}
export default function RegisterForm() {
    const [state, dispatch] = useFormState(register, undefined);

    return (
        <form action={ dispatch } className="space-y-3" name='loginform'>

            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                <div className="flex justify-between">

                    <SvgIcon sx={ { transform: 'scale(1.7)', m: 1 } }><MemoAdeptusMechanicus fontSize={ 25 } /></SvgIcon>
                    <h1 className={ ` mb-3 text-2xl text-center` }>
                        Регистрация

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
                    className="flex h-8 items-end space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    { state && typeof state === 'string' &&
                        <>
                            {/* <ExclamationCircleIcon className="h-5 w-5 text-red-500" /> */ }
                            <p className="text-sm text-red-500">{ state }</p>
                        </>
                    }
                </div>

                <SubmitButton />
                <ResetButton />
            </div>
        </form>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button aria-disabled={ pending } variant='contained' color={ pending ? 'info' : 'success' } sx={ { py: 1, m: 2 } } type='submit' disabled={ pending }>
            Submit
        </Button>
    );
}
function ResetButton() {
    const { pending } = useFormStatus();

    return (
        <Button aria-disabled={ pending } variant='contained' color={ pending ? 'info' : 'warning' } sx={ { py: 1, m: 2 } } type='reset' disabled={ pending }>
            Reset
        </Button>
    );
}
function RegisterButton() {
    const { pending } = useFormStatus();

    return (
        <Button aria-disabled={ pending } variant='contained' color='secondary' sx={ { py: 1, m: 2 } } disabled={ pending }>
            Register
        </Button>
    );
}