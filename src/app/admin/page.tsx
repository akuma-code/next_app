import { AdminCard } from "@/ClientComponents/AdminCardButtons";
import { Container } from "@mui/material";
import { reseedPlayers } from "./actions";

async function AministratorPage() {
    const force = JSON.parse(process.env.DB_SEED_FORCE ?? "false");
    return (
        <Container maxWidth="md">
            <AdminCard seedAction={reseedPlayers.bind(null, force)} />
        </Container>
    );
}

export default AministratorPage;
