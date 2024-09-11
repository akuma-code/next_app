import { DB_CardLocal } from "@/app/avangard/(main)/_components/LocalDBCard";
import { Server_DB_Card } from "@/app/avangard/(main)/_components/ServerDBCard";
import { Box, Grid2 } from "@mui/material";

export default async function ComparePage() {
    // const server_data = await fetchServer();

    return (
        <Box>
            <Grid2
                p={1}
                container
                gap={2}
                maxHeight={500}
                sx={{ bgcolor: "#afd850" }}
            >
                <Grid2 overflow={"auto"}>
                    <Server_DB_Card take={5} order={"desc"} />
                </Grid2>
                <Grid2>
                    <DB_CardLocal take={5} />
                </Grid2>
            </Grid2>
        </Box>
    );
}
