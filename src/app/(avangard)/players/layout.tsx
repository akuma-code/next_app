import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import BlurLinearIcon from "@mui/icons-material/BlurLinear";
import Link from "next/link";
import { EventHeader } from "@/Components/Nav/EventsHeader";
import { DashboardLayout, PageContainer } from "@toolpad/core";

function PlayersLayout({
    children,
    view,
}: {
    children: React.ReactNode;
    view: React.ReactNode;
}) {
    return (
        // <DashboardLayout>
        <PageContainer>
            {/* <EventHeader /> */}
            <Box>{children}</Box>
            <Box>{view}</Box>
        </PageContainer>
        // </DashboardLayout>
    );
}

export default PlayersLayout;
