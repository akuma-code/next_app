import StackedBarChart from "@/Components/Charts/StackedBarChart";
import { getDBManyEventsData } from "@/Services/events/db_event";
import { Box, Grid } from "@mui/material";
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

    const { data, total } = await getDBManyEventsData(
        { isDraft: false },
        {
            date_formated: true,
            pairs: false,
            players: false,

            _count: { select: { players: true, pairs: true } },
        },
        {
            skip: skip,
            take: rpp,
            orderBy: { date_formated: "desc" },
        }
    );
    const [last, ...rest] = data;
    return (
        <Grid
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
            <Grid item md={3}>
                <ItemsList items={data} />
            </Grid>
            <Grid item md={4}>
                <Board />
            </Grid>

            <Grid item md={4}>
                <StackedBarChart />
            </Grid>
        </Grid>
    );
}

export default MainPage;
