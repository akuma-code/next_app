

import { AdminCard } from "@/ClientComponents/AdminCardButtons";
import { masters_to_seed } from "@/seed/players";
import { seedMasters } from "@/seed/seed";
import { Box, Button, Card, CardContent, Container, Grid } from "@mui/material";
import { reseedMasters } from "./actions";

function AministratorPage() {

    return (
        <Container maxWidth="md" >
            <AdminCard seedAction={ reseedMasters } />
        </Container >
    );
}


export default AministratorPage;


