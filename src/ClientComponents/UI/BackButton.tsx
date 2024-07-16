'use client'
import React, { HTMLAttributes } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Button, ButtonOwnProps, ButtonTypeMap, ExtendButtonBase } from '@mui/material'
export const BackButton = () => {
    const router = useRouter()
    const pathname = usePathname()

    return (
        // <Button onClick={ router.back }
        //     variant='contained'
        // >Назад
        // </Button>
        <BTN_BACK color='secondary' />
    )
}
export const BTN_BACK = React.forwardRef<ExtendButtonBase<ButtonTypeMap<{}, "button">>, ButtonOwnProps>(
    function BTN(props, ref) {
        const router = useRouter()


        return (
            <Button
                color='secondary'
                variant='outlined'
                { ...props }

                onClick={ router.back }
            >Назад
            </Button>
        );
    },
);
export default BTN_BACK