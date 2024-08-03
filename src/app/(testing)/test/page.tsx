import DoubleChip from "@/ClientComponents/MRT/Avangard/DoubleChip";
import LoadSpinner from "@/ClientComponents/UI/Loader/LoadSpinner";
import { Box, Container, Paper, Typography } from "@mui/material";

export default async function Testpage() {
    return (
        <Box bgcolor={"#e4e4e4"}>
            <Typography variant="h3" component={"div"} textAlign={"center"}>
                TEST PAGE
            </Typography>
            <Box>
                <LoadSpinner />
            </Box>
        </Box>
    );
}
