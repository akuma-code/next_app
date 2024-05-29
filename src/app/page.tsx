import { checkAuth } from "@/ClientComponents/clientAuth";
import { Box, Container } from "@mui/material";
import Link from "next/link";
import { permanentRedirect } from "next/navigation";


function HomePage() {


    return (
        <Box display={ 'flex' } gap={ 2 }>
            <Link href={ '/' }>Home</Link>
            <Link href={ 'avangard' }>Avangard</Link>
            <Link href={ 'admin' }>Admin</Link>

        </Box>
    );
}

export default HomePage;