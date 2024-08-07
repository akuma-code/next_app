"use client";

import { Autocomplete, OutlinedInput, TextField } from "@mui/material";

const NameInput: React.FC<{ options: { id: number; name: string }[] }> = ({
    options,
}) => {
    return (
        <Autocomplete
            options={options}
            renderInput={(params) => (
                <TextField variant="outlined" {...params} />
            )}
            // getOptionLabel={(o) => o?.name || ""}
        />
    );
};

export default NameInput;
