import { Box, Typography } from "@mui/material";

async function ViewSlotPage({
    params,
}: {
    params: { category: string; id: string };
}) {
    const { category, id } = params;

    return (
        <Box>
            <Typography>{category}</Typography>
            <Typography>{id}</Typography>
        </Box>
    );
}

export default ViewSlotPage;
