import { Box } from "@mui/material";

async function FormLayout({ children }: { children: React.ReactNode }) {

    return (
        <Box>
            { children }
        </Box>
    )
}

export default FormLayout