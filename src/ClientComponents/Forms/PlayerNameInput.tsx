"use client";

import { Autocomplete, OutlinedInput, TextField } from "@mui/material";
import { useState, useTransition } from "react";

interface DraftEventData {
    date?: string;
    players: string[];
    eventId?: number;
}
const NameInput: React.FC<{ options: { id: number; name: string }[] }> = ({
    options,
}) => {
    const [isPending, start] = useTransition();
    const [data, setData] = useState<DraftEventData>({ players: [] });
    const [current, setCurrent] = useState<string | null>("");
    const names_map = options.map((o) => o.name);

    return (
        <Autocomplete
            freeSolo
            options={names_map}
            renderInput={(params) => (
                <TextField
                    variant="filled"
                    {...params}
                    helperText="Начните вводить свое имя, появится список"
                />
            )}
            autoHighlight
            value={current}
            onChange={(e, v) => setCurrent(v)}
        />
    );
};

export default NameInput;
