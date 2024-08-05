import { AdminCard } from "@/ClientComponents/AdminCardButtons";
import { Container } from "@mui/material";
import backup from "./../../../public/json/data.json";
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
