'use server'

import { Auth } from "@/ClientComponents/Auth";
import { Box } from "@mui/material";
import Link from "next/link";

function AministratorPage() {

    return (
        <Box>
            <Auth />
        </Box>
    );
}


export default AministratorPage;


