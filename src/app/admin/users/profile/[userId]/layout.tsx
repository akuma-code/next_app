import { NavLink } from "@/ClientComponents/UI/NavLink";
import { Box, Button, ButtonGroup, Stack, Container } from "@mui/material";
import Link from "next/link";


export default async function ProfileLayOut(params: { params: { userId: string }, children: React.ReactNode }) {
    const { children } = params

    return (
        <Box p={ 1 }>
            <Stack gap={ 2 }>
                <Container>

                    { children }
                </Container>
                <ButtonGroup variant="contained">
                    <Button disabled
                        LinkComponent={ Link }
                        href={ `/admin/users/profile/${params.params.userId}/edit` }
                    >Edit
                    </Button>
                    <Button color="error">Delete</Button>
                    <Button disabled>Logout</Button>

                </ButtonGroup>
            </Stack>
        </Box>
    )

}


