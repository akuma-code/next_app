import { Button } from "@mui/material";

interface ResetButtonProps {
    label?: string
    buttonProps?: {
        variant?: 'contained' | 'outlined' | 'text'
    }
}

const ResetButton: React.FunctionComponent<ResetButtonProps> = (props) => {
    const { label = 'Сбросить', buttonProps = { variant: 'outlined' } } = props
    return (
        <Button { ...buttonProps } type="reset">
            { label }
        </Button>
    );
}

export default ResetButton;