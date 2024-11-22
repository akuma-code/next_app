import { Box, Container, Paper } from "@mui/material";

function Layout({ children }: { children: React.ReactNode }) {
    return <Container maxWidth="lg">
        <Box
            border={ '2px solid' }
            borderRadius={ '2rem' }
            p={ 3 }
            width={ 'fit-content' }
            component={ Paper }
        >

            { children }
        </Box>
    </Container>;
}
export default Layout;
