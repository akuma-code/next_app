import { createInstance } from "@/Services/draftEventService"
import { useMemo, useState } from "react"


interface Member {
    id: number
    name: string
}
interface DraftEventState {
    members: Member[]


}

export function useDraftEvent({ players }: { players: Member[] }) {
    // const lastId = useMemo(() => Math.max(...players.map(p => p.id)), [players])
    const options = useMemo(() => players.map(p => ({ id: p.id, name: p.name })), [players])
    const [draft, setDraft] = useState<DraftEventState>({ members: [] })
    const lastId = useMemo(() => {
        const ids = players
            .map(p => p.id)
            .concat(draft.members.map(m => m.id))
        return Math.max(...ids)

    }, [players, draft.members])

    const createMember = (name: string) => {
        const candidate: Member = {
            id: lastId + 1,
            name
        }
        return candidate
    }
    async function createEventDraft(members: Member[]) {
        const inst = await createInstance({ members })
        return inst
    }
    const add = (name: string) => setDraft(prev => ({ ...prev, members: [...prev.members, createMember(name)] }))
    const remove = (id: number) => setDraft(prev => ({ ...prev, members: prev.members.filter(m => m.id !== id) }))
    const clear = () => setDraft(prev => ({ ...prev, members: [] }))
    const dispatch = { add, remove, clear, createEventDraft }
    return { state: draft, options, dispatch }

}





