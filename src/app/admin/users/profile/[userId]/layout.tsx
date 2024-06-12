import { Box, Button, ButtonGroup, Stack } from "@mui/material";
import Link from "next/link";

export default async function ProfileLayOut(params: { params: { userId: string }, children: React.ReactNode }) {
    const { children } = params

    return (
        <Box>
            <Stack>
                <ButtonGroup>
                    <Button
                        LinkComponent={ Link }
                        href={ `/admin/users/profile/${params.params.userId}/edit` }
                    >Edit</Button>
                    <Button>Delete</Button>
                    <Button>Logout</Button>

                </ButtonGroup>
                { children }
            </Stack>
        </Box>
    )

}