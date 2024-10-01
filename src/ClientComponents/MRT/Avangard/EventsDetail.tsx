import { monthReducer } from "@/Helpers/eventsMonthParser";
import { useToggle } from "@/Hooks/useToggle";
import { PrismaPlayer_ } from "@/Types";
import { Grid, Button, Grid2 } from "@mui/material";
import { MRT_Row } from "material-react-table";

export function PlayerEventsDetail({ row }: { row: MRT_Row<PrismaPlayer_> }) {
    const [open, { toggle }] = useToggle(true);
    const { original } = row;
    const { _count, events, profile, ticket, name } = original;
    const _det = monthReducer(events);
    if (!_det) return null;
    const { year, months, days } = _det;

    const months_array = Object.entries(months).map(([m, c]) => ({
        month: m,
        count: c,
    }));
    const days_array = Object.entries(days).map(([m, c]) => ({
        month: m,
        dates: c,
    }));
    // console.log(days_array);
    return (
        <Grid2 container>
            <Grid
                item
                container
                gridRow={4}
                columnGap={0}
                gap={1}
                sx={{
                    [`& .MuiGrid-item`]: {
                        border: "1px solid grey",
                        p: 1,
                        alignItems: "center",
                        display: "flex",
                        // justifyContent: "space-between",
                        gap: 1,
                    },
                }}
            >
                {months_array.map((d, idx) => (
                    <Grid2 key={idx * 0.3} textAlign={"center"}>
                        <Grid item justifyContent={"center"}>
                            {d.month}
                        </Grid>
                        <Grid item justifyContent={"center"}>
                            {open ? d.count : days_array[idx].dates.join(", ")}
                        </Grid>
                    </Grid2>
                ))}

                <Grid item direction={"column"}>
                    {/* <Grid2 ml={1} item> */}
                    <Grid2 justifyContent={"end"}>
                        <b>{year}</b>
                    </Grid2>
                    <Grid2>
                        <b> Итого: {_count.events}</b>
                    </Grid2>
                </Grid>
                {/* </Grid2> */}
            </Grid>

            <Grid item>
                <Button onClick={toggle} variant="outlined">
                    Даты / Кол-во
                </Button>
            </Grid>
        </Grid2>
    );
}
