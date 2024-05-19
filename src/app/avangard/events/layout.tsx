import { MonthTabs } from "@/ClientComponents/Tabs/MonthTabs"
import { getEventsByMonth } from "@/Services/eventService"
import { Stack } from "@mui/material"
import dayjs from "dayjs"



const tabList = [
    { href: { query: { month: '04' } } },
    { href: { query: { month: '05' } } },
    { href: { query: { month: '06' } } },
    { href: { query: { month: '07' } } },
]

const EventsLayout = async ({ children, searchParams, params }: { children: React.ReactNode, searchParams?: { month?: string }, params?: { eventId: string } }) => {

    const currentMonth = dayjs().month()
    const month = searchParams?.month
    const prevMonth = dayjs().month() - 1
    const nextMonth = dayjs().add(1, 'month').month()
    const events = await getEventsByMonth(month)

    return (
        <>
            <Stack direction={ 'column' }>


                {/* <MonthTabs /> */ }
                { children }
            </Stack>

        </>
    )
}

export default EventsLayout


/* <Divider>
<Link href={ {
query: { month: prevMonth }
} }>
<Button> { Month[prevMonth] }</Button>
</Link>
{ Month[currentMonth] }
<Link href={ {
query: { month: nextMonth }
} }>

<Button>{ Month[nextMonth] }</Button>
</Link>
</Divider> */