import { AdminCard } from "@/ClientComponents/AdminCardButtons";
import { Box, Button, Container } from "@mui/material";
import { backupEvents, resedjson, reseedEvents, reseedPlayers } from "./actions";
import { seedUsers } from "@/seed/seed";
import { DB_JSON_DATA } from "@/Types";
import { seedFromJson } from "@/seed/json/seedJson";
import backup from './../../../public/json/data.json'
async function AministratorPage(params: { searchParams: { show: string } }) {
    const show = params.searchParams.show;
    const force = JSON.parse(process.env.DB_SEED_FORCE ?? "false");
    // const b = await backupEvents();
    return (
        <Container maxWidth="md">
            <AdminCard
                seedAction={ resedjson.bind(null, backup) }
            // actions={[backupEvents, reseedEvents]}
            />
        </Container>
    );
}
export default AministratorPage;


