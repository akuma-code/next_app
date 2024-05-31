import { _formated_date } from "@/Helpers/dateFuncs";
import { _log } from "@/Helpers/helpersFns";
import { createBlankEvent, getOneEventByDate } from "@/Services/eventService";
import { Box, Stack } from "@mui/material";

import EventControlParam from "@/Components/EventControlParams";
import allP from "@/utils/playersList";
import dayjs from "dayjs";
type PageProps = {
    params: {
        date: string
    }
}

export default async function AvangardPageDate({ params }: PageProps) {

    const date = params.date

    const all = await allP()


    const activeEvent = await getOneEventByDate(date)
    _log(activeEvent?.id)
    const isExistEvent = !!activeEvent
    return (
        <Box component={ Stack } direction={ { md: 'row', sm: 'column' } } alignItems={ 'start' } gap={ 2 }>
            { isExistEvent
                ? <EventControlParam allPlayers={ all } event={ activeEvent } params={ params } />
                : <EventControlParam allPlayers={ all } params={ params } />
            }



        </Box>
    )
}



async function EventBlank(date: string) {
    const isEventDay = [2, 4].includes(dayjs(date).day())
    const blankEvent = await createBlankEvent(_formated_date(dayjs()), "Blank Event")
    let event: ReturnType<typeof createBlankEvent> | null = null


}