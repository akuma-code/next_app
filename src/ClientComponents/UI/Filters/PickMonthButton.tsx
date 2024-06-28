'use client'
import { Button } from "@mui/material";
import { BaseSingleInputFieldProps, DateValidationError, FieldSection, UseDateFieldProps } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";

interface ButtonFieldProps extends UseDateFieldProps<Dayjs, false>,
    BaseSingleInputFieldProps<
        Dayjs | null,
        Dayjs,
        FieldSection,
        false,
        DateValidationError
    > {
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

function ButtonField(props: ButtonFieldProps) {
    const {
        setOpen,
        label,
        id,
        disabled,
        InputProps: { ref } = {},
        inputProps: { 'aria-label': ariaLabel } = {},
    } = props;

    return (
        <Button
            variant="outlined"
            id={ id }
            disabled={ disabled }
            ref={ ref }
            aria-label={ ariaLabel }
            onClick={ () => setOpen?.((prev) => !prev) }
        >
            { label ? label : 'Pick a date' }
        </Button>
    );
}


export default ButtonField