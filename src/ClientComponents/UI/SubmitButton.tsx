
import { Button } from "@mui/material";
import { revalidatePath } from "next/cache";

interface SubmitButtonProps {
    label?: string
    buttonProps?: {
        variant?: 'contained' | 'outlined' | 'text'
    }
}

const SubmitButton: React.FunctionComponent<SubmitButtonProps> = (props) => {

    const { label = 'Submit', buttonProps = { variant: 'outlined' } } = props
    return (
        <Button { ...buttonProps } type="submit" >
            { label }
        </Button>
    );
}

export default SubmitButton;