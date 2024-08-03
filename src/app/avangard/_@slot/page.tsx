import { Breadcrumbs } from "@/Components/Nav/Breadcrumps";
import { Box } from "@mui/material";
import Link from "next/link";

export default function Page() {
    const items = [
        {
            text: "Home",
            href: "/avangard",
        },
    ];
    return (
        <Box>
            <Breadcrumbs items={items} />
        </Box>
    );
}
