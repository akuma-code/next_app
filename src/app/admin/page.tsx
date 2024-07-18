import { AdminCard } from "@/ClientComponents/AdminCardButtons";
import { Container } from "@mui/material";
import backup from './../../../public/json/data.json';
import { reseedEventsFromJson } from "./actions";
async function AministratorPage(params: { searchParams: { show: string } }) {

    const action = reseedEventsFromJson.bind(null, backup)

    return (
        <Container maxWidth="md">
            <AdminCard seedAction={ action } />

        </Container>
    );
}
export default AministratorPage;


