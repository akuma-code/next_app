import { auth } from "@/auth/auth";
import { EventViewEditCard } from "@/Components/EventView/EventViewEditCard";
import { getEventById } from "@/Services/eventService";
import { Box, CircularProgress } from "@mui/material";

export default async function EventIdEditPage({
    params,
}: {
    params: { eventId: string };
}) {
    const { eventId } = params;
    const edit_event = await getEventById(eventId);
    const session = await auth();
    if (!session?.user) return <Box>Доступ закрыт! Авторизуйтесь!</Box>;
    return (
        <>
            {edit_event ? (
                <EventViewEditCard event={edit_event} />
            ) : (
                <CircularProgress variant="indeterminate" />
            )}
        </>
    );
}
