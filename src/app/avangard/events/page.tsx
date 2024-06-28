import { EventsList } from "@/ClientComponents/EventsList"
import { MonthTabs } from "@/ClientComponents/Tabs/MonthTabs"
import { getEventsByMonth } from "@/Services/eventService"
import { Box, Container } from "@mui/material"

type OrderType = "asc" | 'desc'
async function EventsPage({ searchParams }: { searchParams: { date: string, month: string, order: string } }) {
    const month = searchParams.month
    let order = searchParams.order

    const monthEvets = await getEventsByMonth(month, order as OrderType)
    return (
        <Box >
            <MonthTabs />
            <EventsList events={ monthEvets } />

        </Box>
    )
}


export default EventsPage