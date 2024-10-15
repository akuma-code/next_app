import { DB_CardLocal } from "@/app/(avangard)/_components/LocalDBCard";
import { Server_DB_Card } from "@/app/(avangard)/_components/ServerDBCard";
import {
    EventRowCard,
    PrismaEventRowCard,
} from "@/Components/EventView/EventRowCard";
import { getEvents } from "@/Services/events/eventActions";
import { Box, Button, ButtonGroup, Grid2, Typography } from "@mui/material";
import dayjs from "dayjs";
import Link from "next/link";
dayjs.locale("ru");
export default async function ComparePage({
    searchParams,
}: {
    searchParams: { take: string; order: string };
}) {
    // const server_data = await fetchServer();
    const t = +searchParams.take || 100;
    const events = (await getEvents({
        orderBy: { date_formated: "desc" },
    })) as unknown as PrismaEventRowCard[];
    return (
        <Box>
            <Grid2
                p={1}
                container
                gap={2}
                sx={{ bgcolor: "#afd850" }}
                gridAutoFlow={"row"}
            >
                <Grid2
                    size={12}
                    direction={"row"}
                    display={"flex"}
                    justifyContent={"space-between"}
                    mx={2}
                >
                    <Typography variant="h6" component="div">
                        Дата
                    </Typography>
                    <Typography variant="h6" component="div">
                        Описание
                    </Typography>
                    <Typography variant="h6" component="div">
                        Состав
                    </Typography>
                </Grid2>
                {events.map((e) => (
                    <Grid2 key={e.id} size={12} spacing={1}>
                        <EventRowCard event={e} key={e.date_formated} />
                    </Grid2>
                ))}
                {/* <Grid2>
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
                </Grid2> */}
            </Grid2>
        </Box>
    );
}
