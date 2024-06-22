import { Box, Stack } from "@mui/material";
type PageProps = {
    searchParams: {
        date: string
    }
}

export default async function AvangardPage({ searchParams }: PageProps) {



    return (
        <Box component={ Stack } direction={ { md: 'row', sm: 'column' } } alignItems={ 'start' } gap={ 2 }>
            Avangard page
        </Box>
    )
}


