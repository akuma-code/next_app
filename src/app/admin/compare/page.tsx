import { DB_CardLocal } from "@/app/(avangard)/_components/LocalDBCard";
import { Server_DB_Card } from "@/app/(avangard)/_components/ServerDBCard";
import { Box, Button, ButtonGroup, Grid2 } from "@mui/material";
import Link from "next/link";

export default async function ComparePage({
    searchParams,
}: {
    searchParams: { take: string; order: string };
}) {
    // const server_data = await fetchServer();
    const t = +searchParams.take || 100;
    return (
        <Box>
            <Grid2
                p={1}
                container
                gap={2}
                maxHeight={500}
                sx={{ bgcolor: "#afd850" }}
            >
                <Grid2>
                    <ButtonGroup variant="outlined">
                        <Button>
                            <Link href={{ query: { take: 10 } }}>10</Link>
                        </Button>
                        <Button>
                            <Link href={{ query: { take: 5 } }}>5</Link>
                        </Button>
                        <Button>
                            {" "}
                            <Link href={{ query: { take: 100 } }}>All</Link>
                        </Button>
                    </ButtonGroup>
                </Grid2>
                <Grid2 overflow={"auto"}>
                    <Server_DB_Card take={t} order={"desc"} />
                </Grid2>
                <Grid2>
                    <DB_CardLocal take={t} />
                </Grid2>
            </Grid2>
        </Box>
    );
}
