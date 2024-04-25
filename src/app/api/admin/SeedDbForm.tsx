'use client';
import { useFormState } from "react-dom";
import { stpCreate, stpNumPropsCreate } from "../db/saved/actions";
import { Button } from "@mui/material";
import { FormEvent } from "react";
import { _log } from "@/Helpers/helpersFns";

export function SeedDbForm() {


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const f = new FormData(e.currentTarget)
        const c = f.get('name')

        const ff = await fetch(`/api/db/saved?name=${c}&cursor=777`, { method: 'PATCH' })

        return ff
    }


    return <form onSubmit={ handleSubmit }>
        <input name="name" type="string" defaultValue={ "" } />
        <Button type="submit" variant="contained" color="info"  >
            Seed db num props
        </Button>
    </form>;
}
