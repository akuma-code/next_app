import { EventsList } from "@/ClientComponents/EventsList"
import { MonthTabs } from "@/ClientComponents/Tabs/MonthTabs"
import { getEventsByMonth } from "@/Services/eventService"
import { Box, Container } from "@mui/material"


const EventsPage = async ({ searchParams }: { searchParams: { date: string, month?: string } }) => {
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