'use client';


import { authenticate } from '@/app/lib/actions';
import { Button, SvgIcon } from '@mui/material';
import { useFormState, useFormStatus } from 'react-dom';

import adept from "../../public/wh40k icons/adeptus-mechanicus.png"
import { lazy } from 'react';
import MemoAdeptusMechanicus from '../../public/assets/AdeptusMechanicus';
export default function LoginForm() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    return (
        <form action={ dispatch } className="space-y-3" name='loginform'>

            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                <SvgIcon sx={ { transform: 'scale(2)', m: 1 } }><MemoAdeptusMechanicus fontSize={ 25 } /></SvgIcon>
                <h1 className={ ` mb-3 text-2xl` }>
                    Введите имя и пароль
                    <br />
                </h1>
                <div className="w-full flex flex-col space-y-2">
                    <div className='flex gap-2 mb-2'>

                        {/* <div className="relative flex-grow-0">
                        </div> */}
                        <input
                            // className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                            className='flex-grow'
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter your email address"
                            required
                        />
                        <label
                            className="mb-3 mt-5 pl-3 text-xs font-medium text-gray-900 text-center"
                            htmlFor="email"
                        >
                            Email
                        </label>

                    </div>
                    <div className="mt-4 flex gap-2">


                        <input
                            // className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            required
                            minLength={ 6 }
                        />

                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="password"
                        >
                            Password
                        </label>
                    </div>
                </div>
                <LoginButton />
                <div
                    className="flex h-8 items-end space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    { errorMessage && (
                        <>
                            {/* <ExclamationCircleIcon className="h-5 w-5 text-red-500" /> */ }
                            <p className="text-sm text-red-500">{ errorMessage }</p>
                        </>
                    ) }
                </div>
            </div>
        </form>
    );
}

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <Button aria-disabled={ pending } variant='contained' color='success' sx={ { py: 1, m: 2 } }>
            Log in
        </Button>
    );
}