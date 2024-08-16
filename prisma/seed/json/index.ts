import events from './events.json'
import pairs from './pairs.json'
import players from './players.json'

type TPair = {
    id?: number;
    eventId?: number;
    firstPlayerId?: number;
    secondPlayerId?: number;
    event?: TEvent
    master?: TPlayer
    player?: TPlayer
}
type TPlayer = {
    id: number;
    name: string;
}
type TEvent = {
    date_formated: string;
    id: number;
    title?: string;
    players?: {
        id: number;
        name: string;
        // profileId?: number | null
        createdAt?: string;
        updatedAt?: string;
    }[];
    pairs?: TPair[]
}
export type DB_Type = { events: TEvent[], players: TPlayer[], pairs: TPair[] }

const db: DB_Type = { events, pairs, players }
export default db