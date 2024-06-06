import { MonthTabs } from "@/ClientComponents/Tabs/MonthTabs"
import { getEventsByMonth } from "@/Services/eventService"
import { Stack } from "@mui/material"
import dayjs from "dayjs"




const EventsLayout = async ({ children, params }: { children: React.ReactNode, params?: { eventId: string } }) => {



    return (

        <Stack direction={ 'column' }>



            { children }
        </Stack>

    )
}

export default EventsLayout

