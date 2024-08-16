import { AdminCard } from "@/ClientComponents/AdminCardButtons";
import { Box, Container, Grid, Typography } from "@mui/material";
import backup from "./../../../public/json/data.json";
import { reseedEventsFromJson } from "./actions";
import { DescriptionButtonQuery } from "@/ClientComponents/UI/DescButton";
import { getImportantData } from "../api/backup/events/actions";
const action = reseedEventsFromJson.bind(null, backup);
async function AministratorPage(params: { searchParams: { show: string } }) {
    return (
        <Box p={1}>
            <Grid
                container
                gap={1}
                sx={{
                    "& .MuiGrid-item": {
                        border: "1px solid",
                        p: 1,
                        justifyContent: "center",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 2,
                    },
                }}
            >
                <Grid item md={6} color={"primary.light"}>
                    <DescriptionButtonQuery
                        action={getImportantData.bind(null)}
                        title="Сохранить основные данные"
                        description="fn: getImportantData"
                    />
                    <Typography>Данные без идишников</Typography>
                </Grid>

                <Grid item md={6}>
                    <DescriptionButtonQuery
                        action={fetchServer.bind(null)}
                        title="Вытянуть данные c сервера"
                        description=""
                    />
                    <Typography>
                        https://akumadev....vercel.app/api/backup/
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}
export default AministratorPage;
async function fetchServer() {
    "use server";
    const data = fetch(
        "https://akumadev-git-auth-akuma-codes-projects.vercel.app/api/backup/"
    ).then(
        (r) => r.json(),
        (e) => console.log({ e })
    );
    return data;
}
