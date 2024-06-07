import { Box } from "@mui/material";
import Link from "next/link";


function HomePage() {


    return (
        <Box display={ 'flex' } gap={ 2 }>

            <Link href={ 'avangard' }>Avangard</Link>
            <Link href={ 'admin' }>Admin</Link>

        </Box>
    );
}

export default HomePage;