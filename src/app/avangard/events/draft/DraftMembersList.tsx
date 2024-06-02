'use client'

import { Box } from "@mui/material"
import { Player } from "@prisma/client"
interface DraftListProps {
    draft_event: {
        uuid: string,
        members: Player[],

    } | null
}
export const DraftMembersList: React.FC<DraftListProps> = ({ draft_event }) => {

    if (!draft_event) return <Box>Event not found</Box>
    const { members } = draft_event

    return (
        <Box>Draft Members List</Box>
    )
}