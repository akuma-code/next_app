import { PageContainer } from "@toolpad/core";
import { EventsPagePageToolbar } from "../_components/EventsPageToolbar";

export default function tollbarLayout({
    children,
}: {
    children?: React.ReactNode;
}) {
    return (
        <PageContainer
            slots={{ toolbar: EventsPagePageToolbar }}
            maxWidth={"md"}
            suppressHydrationWarning
        >
            {children}
            {/* <Box maxWidth={{ md: "lg", xs: 350 }}></Box> */}
        </PageContainer>
    );
}
