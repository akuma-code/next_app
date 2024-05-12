'use client'
import { Button } from "@mui/material";
import { revalidatePath } from "next/cache";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
    label?: string
    buttonProps?: {
        variant?: 'contained' | 'outlined' | 'text'
    }
}

const SubmitButton: React.FunctionComponent<SubmitButtonProps> = (props) => {
    const { pending } = useFormStatus()
    const { label = 'Submit', buttonProps = { variant: 'outlined' } } = props
    return (
        <Button { ...buttonProps } type="submit" disabled={ pending }>
            { label }
        </Button>
    );
}

export default SubmitButton;