import { CreateCoachForm } from "@/ClientComponents/createCoachForm";
import { getAllCoaches } from "@/Services/coachService";
import { Box, Button, ButtonGroup, Grow, List, ListItem, ListItemText, Stack } from "@mui/material";
import Link from "next/link";

export default async function CoachPage(params: { searchParams: { action: string } }) {

    const showForm = !!params.searchParams.action
    const treners = await getAllCoaches()
    return (
        <Stack direction={ 'row' } gap={ 4 }>

            <Grow in={ !!treners }>
                <List sx={ { border: '1px solid black', borderRadius: 6 } } >
                    { treners && treners.map(t =>

                        <ListItem key={ t.id } divider>
                            <ListItemText primary={ t.first_name + " " + t.second_name } />
                        </ListItem>
                    ) }
                </List>

            </Grow>
            <Stack direction={ 'column' } spacing={ 2 }>
                <Box gap={ 2 } component={ ButtonGroup }>
                    <Link
                        href={ {
                            query: { action: 'create' }
                        } }>
                        <Button variant="contained">
                            Добавить
                        </Button>
                    </Link>
                    <Link
                        href={ {
                            pathname: '/admin/coaches',
                            query: null,
                        } }>
                        <Button disabled={ !showForm } variant="contained">
                            Закрыть форму
                        </Button>
                    </Link>
                </Box>
                <Box>

                    {
                        showForm &&


                        <CreateCoachForm />

                    }
                </Box>
            </Stack>


        </Stack>
    )
}