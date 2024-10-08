import { Box, Container } from "@mui/material";
import { PageContainer } from "@toolpad/core";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Игроки",
    description: "Список игроков школы Авангард",
};
function PlayersLayout({
    children,
    view,
}: {
    children: React.ReactNode;
    view: React.ReactNode;
}) {
    return (
        // <DashboardLayout>
        <Container maxWidth={"lg"}>
            {/* <EventHeader /> */}
            <Box>{children}</Box>
            <Box>{view}</Box>
        </Container>
        // </DashboardLayout>
    );
}

export default PlayersLayout;
