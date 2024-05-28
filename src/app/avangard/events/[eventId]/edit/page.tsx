import { EventViewEditCard } from '@/Components/EventView/EventViewEditCard'
import { getEventById } from '@/Services/eventService'
import { CircularProgress } from '@mui/material'

export default async function EventIdEditPage({ params }: { params: { eventId: string } }) {
    const { eventId } = params
    const edit_event = await getEventById(eventId)

    return (
        <div>
            { edit_event ?
                <EventViewEditCard event={ edit_event } />
                : <CircularProgress variant='indeterminate' />
            }
        </div>
    )

}

