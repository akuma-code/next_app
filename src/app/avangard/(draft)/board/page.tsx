import { CreateDraftEventForm } from "@/ClientComponents/Forms/DraftEventForm";
import { Box, Typography } from "@mui/material";

async function Page() {
    return (
        <Box>
            <Typography variant="h4" textAlign={"center"}>
                Авангард 07/08/24
                <br />
                20:00 - 22:00
            </Typography>

            <Typography variant="h5" textAlign={"center"}>
                Предварительная запись на тренировку
            </Typography>
        </Box>
    );
}

export default Page;
