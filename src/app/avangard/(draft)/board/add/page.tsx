import prisma from "@/client/client";
import { CreateDraftEventForm } from "@/ClientComponents/Forms/DraftEventForm";
import { _formated_date } from "@/Helpers/dateFuncs";
import { getPlayers } from "@/Services/playerService";
import { mdiAlertRhombusOutline } from "@mdi/js";
import Icon from "@mdi/react";
import {
    Alert,
    Box,
    Card,
    CardContent,
    CardHeader,
    Typography,
} from "@mui/material";
import dayjs from "dayjs";

async function AddPage() {
    const draft = await checkEvent();
    if (!draft) return <NoEventAlert />;

    return (
        <Card>
            <CardHeader
                title={"Запись на тренировку"}
                titleTypographyProps={{ textAlign: "center" }}
            />
            <CardContent>
                <CreateDraftEventForm eventId={draft.id} />
            </CardContent>
        </Card>
    );
}

async function checkEvent() {
    const today = _formated_date(dayjs());
    const e = await prisma.event.findFirst({
        where: { date_formated: today, isDraft: true },
        select: { id: true },
    });
    return e;
}

const NoEventAlert = () => (
    <Box>
        <Alert
            color="error"
            icon={<Icon path={mdiAlertRhombusOutline} size={2} />}
            sx={{ alignItems: "center", justifyContent: "center" }}
        >
            <Typography variant="h5" textAlign={"center"}>
                Запись на тренировку еще не открыта
            </Typography>
        </Alert>
    </Box>
);

export default AddPage;
