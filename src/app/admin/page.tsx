import { AdminCard } from "@/ClientComponents/AdminCardButtons";
import { Container } from "@mui/material";
import { reseedEvents, reseedPlayers } from "./actions";

async function AministratorPage() {
    const force = JSON.parse(process.env.DB_SEED_FORCE ?? "false");
    return (
        <Container maxWidth="md">
            <AdminCard seedAction={reseedEvents.bind(null)} />
        </Container>
    );
}

export default AministratorPage;
