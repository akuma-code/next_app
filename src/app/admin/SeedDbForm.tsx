'use client';
import { apiUrl } from "@/paths";
import { Button } from "@mui/material";
import { FormEvent } from "react";

export function SeedDbForm() {


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const f = new FormData(e.currentTarget)
        const c = f.get('name')
        const method = 'GET'
        const ff = await fetch(apiUrl.db + '/saved', { method })

        return ff
    }


    return <form onSubmit={ handleSubmit }>
        <input name="name" type="string" defaultValue={ "" } />
        <Button type="submit" variant="contained" color="info"  >
            Seed db num props
        </Button>
    </form>;
}
