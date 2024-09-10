import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import BlurLinearIcon from "@mui/icons-material/BlurLinear";
import Link from "next/link";
import { EventHeader } from "@/Components/Nav/EventsHeader";

function PlayersLayout({
    children,
    view,
}: {
    children: React.ReactNode;
    view: React.ReactNode;
}) {
    return (
        <Box p={2}>
            {/* <EventHeader /> */}
            <Box>{children}</Box>
            <Box>{view}</Box>
        </Box>
    );
}

export default PlayersLayout;
