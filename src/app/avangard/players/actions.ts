'use server'

import { _log } from "@/Helpers/helpersFns"
import { createPlayer, deletePlayer } from "@/Services/playerService"


export async function deletePlayerAction(formdata: FormData) {
    const payload = Object.fromEntries(formdata.entries()) as { id?: number }
    const { id } = payload
    _log("delete payload: ", payload)
    if (!id) return _log("No id!")
    await deletePlayer({ id })
}
