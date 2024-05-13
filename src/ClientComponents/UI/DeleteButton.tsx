'use client'
import { _log } from "@/Helpers/helpersFns";
import { Button } from "@mui/material";
import { useSearchParams } from "next/navigation";

import { useFormStatus } from "react-dom";

interface DeleteButtonProps {
    formAction: (formdata: FormData) => void
    deleteId: number
    children?: React.ReactNode
    buttonProps?: {
        variant?: 'contained' | 'outlined' | 'text'
    }
}

const DeleteButton: React.FunctionComponent<DeleteButtonProps> = (props) => {
    const { pending } = useFormStatus()
    const { buttonProps = { variant: 'outlined' } } = props
    const q = useSearchParams()
    const id = q.get('id')
    return (
        <form action={ props.formAction }>
            <input type="hidden" value={ props.deleteId } />
            <Button { ...buttonProps } type="submit" disabled={ pending } color="info" >
                { props.children }
            </Button>
        </form>
    );
}

export default DeleteButton;