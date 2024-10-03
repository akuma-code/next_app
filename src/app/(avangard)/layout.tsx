import { NavLink } from "@/ClientComponents/UI/NavLink";
import { Box, Stack, Typography } from "@mui/material";
import { PageContainer } from "@toolpad/core";
import { Metadata } from "next";
import { EventsPagePageToolbar } from "./_components/EventsPageToolbar";

const links = [
    {
        href: "/events",
        label: "Расписание",
    },
    {
        href: "/players",
        label: "Игроки",
    },
    // {
    //     href: "/avangard/board/add",
    //     label: "Запись на тренировку",
    // },
];
export async function tollbarLayout({
    children,
}: {
    children?: React.ReactNode;
}) {
    return (
        <PageContainer
            slots={{ toolbar: EventsPagePageToolbar }}
            maxWidth={"md"}
        >
            {children}
            {/* <Box maxWidth={{ md: "lg", xs: 350 }}></Box> */}
        </PageContainer>
    );
}

export const metadata: Metadata = {
    title: "Тренировки",
    description: "Расписание тренировок",
};
export default tollbarLayout;

// const AvangardLayout: React.FC<{
//     children?: React.ReactNode;
// }> = async ({ children }) => {
//     return (
//         <aside>
//             <Stack
//                 direction={{
//                     sm: "column",
//                     md: "row",
//                 }}
//             >
//                 <Box
//                     flexGrow={1}
//                     maxWidth={{ md: 200, xs: 500 }}
//                     pt={1}
//                     display={"flex"}
//                     flexDirection={{ xs: "row", md: "column" }}
//                     sx={{
//                         [`& :hover.MuiTypography-root`]: {
//                             textUnderlineOffset: 1,
//                             textDecoration: "underline",
//                         },
//                         alignSelf: { xs: "center", md: "start" },
//                     }}
//                 >
//                     {links.map((item) => (
//                         <NavLink key={item.href} href={item.href}>
//                             <Typography variant="subtitle1" component={"div"}>
//                                 {item.label}
//                             </Typography>
//                         </NavLink>
//                     ))}
//                 </Box>
//                 <Box flexGrow={2}>{children}</Box>
//             </Stack>
//             <div id="modal-root" />
//         </aside>
//     );
// };
