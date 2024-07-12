import DoubleChip from "@/ClientComponents/MRT/Avangard/DoubleChip";
import { Container, Paper, Typography } from "@mui/material";

export default async function Testpage() {
    return (
        <Container maxWidth={"md"}>
            <Typography>TEST PAGE</Typography>
            <Paper>
                <DoubleChip
                    player={{ name: "Павел Роднянский" }}
                    master={{ name: "Алан Заикин" }}
                />
                <DoubleChip
                    player={{ name: "Павел Кот" }}
                    // master={{ name: "Алан Заикин" }}
                />
            </Paper>
        </Container>
    );
}
