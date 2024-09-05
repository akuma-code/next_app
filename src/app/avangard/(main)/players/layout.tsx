import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import BlurLinearIcon from "@mui/icons-material/BlurLinear";
import Link from "next/link";
import { EventHeader } from "@/Components/Nav/EventsHeader";

async function PlayersLayout({ children }: { children: React.ReactNode }) {
    return (
        <Box p={2}>
            {/* <EventHeader /> */}
            {children}
        </Box>
    );
}

export default PlayersLayout;
