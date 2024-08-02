import { AdminCard } from "@/ClientComponents/AdminCardButtons";
import { Container } from "@mui/material";
import backup from "./../../../public/json/2024-07-23.json";
import { reseedEventsFromJson } from "./actions";
const action = reseedEventsFromJson.bind(null, backup);
async function AministratorPage(params: { searchParams: { show: string } }) {
    return (
        <Container maxWidth="md">
            <AdminCard seedAction={action} />
        </Container>
    );
}
export default AministratorPage;
