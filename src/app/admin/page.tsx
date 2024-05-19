'use server'

import { Box } from "@mui/material";
import Link from "next/link";

function AministratorPage() {

    return (
        <Box>
            <Link href={ '/admin/players' } className="hover:underline">Players</Link>
        </Box>
    );
}


export default AministratorPage;


