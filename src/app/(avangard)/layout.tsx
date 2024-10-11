import { Metadata } from "next";
// import MechanIcon from "../../public/icon.ico";
export const metadata: Metadata = {
    title: "Авангард",
    description: "Расписание тренировок",
    icons: ["/favicon.ico"],
};
async function MainAvangardLayout({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
}

export default MainAvangardLayout;

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
