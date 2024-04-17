import { Box, Container } from "@mui/material";
import Link from "next/link";

function HomePage() {
    return (
        <Container>
            Home Page
            <Box>

                <Link href={ '/about' }>About</Link>
            </Box>
        </Container>
    );
}

export default HomePage;