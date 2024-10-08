import { Container } from "@mui/material";

function Layout({ children }: { children: React.ReactNode }) {
    return <Container maxWidth="md">{children}</Container>;
}
export default Layout;
