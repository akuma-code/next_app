import { _dbDateParser } from "@/Helpers/dateFuncs";
import { boardDataReducer } from "@/Services/board/boardActions";
import { getEventsWithPagination } from "@/Services/events/eventActions";
import { Alert, Box, Button, Grid, Typography } from "@mui/material";
import EventBoard from "../../EventBoard";
import page from "../page";
import Link from "next/link";

export default async function Page({
    params,
}: {
    params: { category: string; id: string };
}) {
    if (isNaN(Number(params.id)))
        return <Alert color="error">ID must be number</Alert>;
    if (!["player", "event"].includes(params.category)) {
        return <Alert color="error">Category error! {params.category}</Alert>;
    }
    const lastTen =
        (await getEventsWithPagination(Number(8), Number(0), {
            pairs: true,
            players: true,
        })) ?? [];
    const [last, ...rest] = lastTen;

    const { players, pairs } = last as any;
    return (
        <Grid container columns={12}>
            <Grid item md={4}>
                <EventBoard
                    // event={last as any}
                    {...last}
                    eventId={last.id}
                    players={players}
                    pairs={pairs}
                />
            </Grid>
            <Grid item md={1} rowGap={1} p={1} container>
                {rest.map((e, idx) => (
                    <Button size="small" variant="outlined" key={e.id}>
                        <Link
                            href={{
                                pathname: `avangard/event/${e.id}`,
                            }}
                        >
                            {_dbDateParser(e.date_formated).dd_mm_yyyy}
                        </Link>
                    </Button>
                ))}
            </Grid>
            <Grid item md={3} p={1}>
                <Box bgcolor={"#8d8d8d"}>Selected Info</Box>
                <Typography>
                    {params.category}
                    {params.id}
                </Typography>
            </Grid>
        </Grid>
    );
}
