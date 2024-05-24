import { EventsList } from "@/ClientComponents/EventsList"
import { MonthTabs } from "@/ClientComponents/Tabs/MonthTabs"
import { getEventsByMonth } from "@/Services/eventService"

const EventsPage = async ({ searchParams }: { searchParams: { date: string, month?: string } }) => {
    const month = searchParams.month
    const monthEvets = await getEventsByMonth(month)
    return (
        <>
            <MonthTabs />
            <EventsList events={ monthEvets } />

        </>
    )
}


export default EventsPage