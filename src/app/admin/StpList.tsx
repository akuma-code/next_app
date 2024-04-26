
import { Box } from "@mui/material";
import prisma from "../../../prisma/client/client";

async function StpListView() {
    const stps = await prisma.stp.findMany()
    return (
        <Box>
            <ol className="px-1 ">

                { stps.map(s =>
                    <li key={ s.id } className="list-decimal hover:underline">

                        { s.name }
                    </li>

                ) }
            </ol>
        </Box>);
}

export default StpListView;