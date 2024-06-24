import { EventsList } from "@/ClientComponents/EventsList"
import { MonthTabs } from "@/ClientComponents/Tabs/MonthTabs"
import { getEventsByMonth } from "@/Services/eventService"
import { Box, Container } from "@mui/material"


async function EventsPage({ searchParams }: { searchParams: { date: string, month?: string } }) {
    const month = searchParams.month
    const monthEvets = await getEventsByMonth(month)
    return (
        <Box >
            <MonthTabs />
            <EventsList events={ monthEvets } />

        </Box>
    )
}


export default EventsPage