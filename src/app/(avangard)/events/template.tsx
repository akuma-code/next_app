import { PageContainer } from "@toolpad/core";
import { EventsPagePageToolbar } from "../_components/EventsPageToolbar";
import { Container } from "@mui/material";

export default async function tollbarLayout({
    children,
}: {
    children?: React.ReactNode;
}) {
    return (
        <Container
            // slots={{ toolbar: EventsPagePageToolbar }}
            maxWidth={"md"}
            suppressHydrationWarning
            sx={{ pl: "2rem" }}
        >
            {children}
            {/* <Box maxWidth={{ md: "lg", xs: 350 }}></Box> */}
        </Container>
    );
}
