import { Button, ButtonGroup, Grid2, Paper } from "@mui/material";
import { Board } from "@/app/(avangard)/_components/Board";

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
        >
            <Grid2 size={"auto"}>
                <Paper elevation={2}>
                    <Board />
                </Paper>
            </Grid2>

            {/* <Grid2 width={"auto"}></Grid2> */}
        </Grid2>
    );
}

export default MainPage;
