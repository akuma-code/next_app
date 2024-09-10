import StackedBarChart from "@/Components/Charts/StackedBarChart";
import { getDBManyEventsData } from "@/Services/events/db_event";
import { getEvents } from "@/Services/events/eventActions";
import { Grid2 } from "@mui/material";
import { Board } from "./_components/Board";
import { ItemsList } from "./_components/EventList";

const validateNumber = (n: number, x?: number) => (!isNaN(n) ? n : x ? x : 0);
async function MainPage({
    searchParams,
}: {
    searchParams: { page?: string; rpp?: string; eventId?: string };
}) {
    const page = validateNumber(Number(searchParams.page), 0);
    const rpp = validateNumber(Number(searchParams.rpp), 10);
    let skip = Math.abs(page * rpp);
    const eventId = Number(searchParams.eventId);
    const e_data = await getEvents({
        where: {
            isDraft: false,
        },
        select: {
            id: true,
            date_formated: true,
            pairs: true,
            players: { select: { id: true, name: true } },
            _count: { select: { players: true, pairs: true } },
        },
        take: rpp,
        skip,
        orderBy: { date_formated: "desc" },
    });

    // const { data, total } = await getDBManyEventsData(
    //     { isDraft: false },
    //     {
    //         date_formated: true,
    //         pairs: false,
    //         players: false,

    //         _count: { select: { players: true, pairs: true } },
    //     },
    //     {
    //         skip: skip,
    //         take: rpp,
    //         orderBy: { date_formated: "desc" },
    //     }
    // );

    return (
        <Grid2
            container
            columns={12}
            gap={1}
            justifyContent={"space-between"}
            // columnGap={1}
            sx={{
                [`& .MuiGrid-item`]: {
                    border: "1px solid grey",
                    p: 1,
                    // w: "fit-content",
                },
            }}
        >
            <Grid2 width={"auto"}>
                <Board />
            </Grid2>

            <Grid2 width={"auto"}>
                <StackedBarChart />
            </Grid2>
            <Grid2 width={"auto"}>
                {e_data && <ItemsList items={e_data} />}
            </Grid2>
        </Grid2>
    );
}

export default MainPage;
