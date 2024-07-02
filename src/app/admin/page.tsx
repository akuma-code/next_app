import { AdminCard } from "@/ClientComponents/AdminCardButtons";
import { Box, Button, Container } from "@mui/material";
import { backupEvents, reseedEvents, reseedPlayers } from "./actions";

async function AministratorPage(params: { searchParams: { show: string } }) {
    const show = params.searchParams.show;
    const force = JSON.parse(process.env.DB_SEED_FORCE ?? "false");
    const b = await backupEvents();
    return (
        <Container maxWidth="md">
            <AdminCard
                // seedAction={reseedEvents.bind(null)}
                actions={[backupEvents, reseedEvents]}
            />
        </Container>
    );
}
export default AministratorPage;
