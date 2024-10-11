import { verifySession } from "@/auth/verifySession";
import AccessDenied from "@/ClientComponents/auth/AccessDenied";

import { Box, Container } from "@mui/material";
import { PageContainer } from "@toolpad/core";
import { Metadata } from "next";

interface ContainerLayoutProps {
    children: React.ReactNode;
    view: React.ReactNode;
}

export const metadata: Metadata = {
    title: "Админка",
    description: "Панель администратора",
    icons: { icon: "/icon_admin.ico" },
};

const AdminLayout: React.FC<ContainerLayoutProps> = async ({
    children,
    view,
}) => {
    const { isAuth } = await verifySession();

    return (
        <>
            <Container maxWidth={"lg"}>{children}</Container>
            {
                // isAuth ? (
                //     // <Stack direction={{ sm: "column" }} m={1} gap={1}>
                //     <Box
                //     //  maxWidth={{ md: 980, xs: 350 }}
                //     >
                //         {view}
                //     </Box>
                // ) : (
                //     // <Box maxWidth={{ md: "90vw", xs: 350 }}>
                //     //     <PageContainer>
                //     //         {children}
                //     //     </PageContainer>
                //     // </Box>
                //     <AccessDenied />
                // )
            }
        </>
    );
};

export default AdminLayout;
