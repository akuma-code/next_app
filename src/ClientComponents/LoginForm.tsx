'use client';


import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/actions';
import { Button } from '@mui/material';
import { ArrowRightIcon } from '@mui/x-date-pickers';

export default function LoginForm() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    return (
        <form action={ dispatch } className="space-y-3">
            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                <h1 className={ ` mb-3 text-2xl` }>
                    Please log in to continue.
                </h1>
                <div className="w-full ">
                    <div className='flex gap-4 flex-row'>

                        <div className="relative">
                            <input
                                // className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                className='flex-grow'
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                required
                            />
                        </div>
                        <label
                            className="mb-3 mt-5 ml-3 block text-xs font-medium text-gray-900"
                            htmlFor="email"
                        >
                            Email
                        </label>
                    </div>
                    <div className="mt-4 flex gap-4">

                        <div className="relative">
                            <input
                                // className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                required
                                minLength={ 6 }
                            />
                        </div>
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