import StackedBarChart from "@/Components/Charts/StackedBarChart";
import { Grid2, Paper } from "@mui/material";
import { Board } from "../avangard/(main)/_components/Board";
import { CalendarEventsShorts } from "@/ClientComponents/UI/Charts/CalenarWithShortcuts";

const validateNumber = (n: number, x?: number) => (!isNaN(n) ? n : x ? x : 0);
async function MainPage({
    searchParams,
}: {
    searchParams: { page?: string; rpp?: string; eventId?: string };
}) {
    const page = validateNumber(Number(searchParams.page), 0);
    const rpp = validateNumber(Number(searchParams.rpp), 10);
    let skip = Math.abs(page * rpp);

    return (
        <Grid2
            // border={"1px solid"}
            container
            columns={12}
            gap={1}
            // m={2}
            // justifyContent={"space-between"}
            // columnGap={1}
            // sx={{
            //     [`& .MuiGrid-item`]: {
            //         border: "2px solid grey",
            //         p: 1,
            //         // w: "fit-content",
            //     },
            // }}
        >
            <Grid2 size={"auto"}>
                <Paper elevation={2}>
                    <Board />
                </Paper>
            </Grid2>

            {/* <Grid2 width={"auto"}>
                <CalendarEventsShorts playerId={11} />
            </Grid2> */}
        </Grid2>
    );
}

export default MainPage;
