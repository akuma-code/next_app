import { Box, Typography } from "@mui/material";

async function ViewSlotPage({ params }: { params: { id: string } }) {
    const { id } = params;

    return (
        <Box>
            {/* <Typography>{category}</Typography> */}
            <Typography>{id}</Typography>
        </Box>
    );
}

export default ViewSlotPage;
