'use client';
import { useFormState } from "react-dom";
import { stpCreate } from "../db/saved/actions";
import { Button } from "@mui/material";

export function SeedDbForm() {
    const [state, formAction] = useFormState(stpCreate, undefined);



    return <form method="POST">
        <input type="hidden" name="name" />
        <Button type="submit" formAction={ formAction }>
            Seed db
        </Button>
    </form>;
}
