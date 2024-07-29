import { Box, Card, CardContent, CardHeader } from "@mui/material";
import EventBoard from "./EventBoard";

async function MainPage() {
    return (
        <Box>
            <EventBoard event={one_event} />
        </Box>
    );
}

export default MainPage;

const one_event = {
    id: 86,
    date_formated: "2024-07-10",
    title: "Тренировка",
    isDraft: false,
    players: [
        {
            id: 3,
            name: "Володя Юдаев",
        },
        {
            id: 6,
            name: "Инна Гулина",
        },
        {
            id: 7,
            name: "Лариса Басманова",
        },
        {
            id: 12,
            name: "Рома Русаков",
        },
        {
            id: 15,
            name: "Сергей Коробов",
        },
        {
            id: 20,
            name: "Надежда Отпетова",
        },
        {
            id: 28,
            name: "Володя Иванов",
        },
        {
            id: 35,
            name: "Сергей Олейников",
        },
        {
            id: 41,
            name: "Жижирий Сергей",
        },
        {
            id: 43,
            name: "Андрей Руденко",
        },
        {
            id: 46,
            name: "Надя",
        },
        {
            id: 11,
            name: "Павел Роднянский",
        },
        {
            id: 202,
            name: "Эдуард Емельянов",
        },
    ],
    pairs: [
        {
            id: 51,
            firstPlayerId: 1,
            secondPlayerId: 35,
            masterId: null,
            playerId: null,
            eventId: 86,
        },
        {
            id: 52,
            firstPlayerId: 2,
            secondPlayerId: 12,
            masterId: null,
            playerId: null,
            eventId: 86,
        },
        {
            id: 53,
            firstPlayerId: 2,
            secondPlayerId: 46,
            masterId: null,
            playerId: null,
            eventId: 86,
        },
    ],
};
