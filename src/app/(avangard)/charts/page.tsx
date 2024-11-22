import { Grid2, Paper, Stack, Typography } from "@mui/material";
import { Suspense } from "react";
import { ChartQuerySelector } from "../_components/ChartQuerySelector";
import ChartsSelector from "../_components/ChartsSelector";


interface SP {
    page?: string;
    rpp?: string;
    eventId?: string
    view?: string
}
const validateNumber = (n: number, x?: number) => (!isNaN(n) ? n : x ? x : 0);




async function MainPage({
    searchParams,
}: {
    searchParams: SP;
}) {
    const page = validateNumber(Number(searchParams.page), 0);
    const rpp = validateNumber(Number(searchParams.rpp), 10);
    const view = searchParams.view
    let skip = Math.abs(page * rpp);



    return (
        <>
            <Suspense fallback={ <div>...loading</div> }>
                <Stack spacing={ 3 } width={ 'max-content' }>
                    <Typography
                        variant="h4"
                        p={ 1 }
                        textAlign={ 'center' }
                    >
                        Сводка данных с мая 2024 г.
                    </Typography>

                    <ChartQuerySelector view={ view } />
                    {/* <Grid2
                        // border={"1px solid"}
                        container
                        columns={ 12 }
                        // gap={ 1 }
                        direction={ "row" }
                        spacing={ 2 }
                    >
                        <Grid2 size="auto">
                        </Grid2> */}
                    {/* <Paper elevation={ 4 }> */ }


                    <ChartsSelector view={ view || "players" } />
                    {/* </Paper> */ }

                    {/* </Grid2> */ }
                </Stack>
            </Suspense >
        </>
    );
}



export default MainPage;
