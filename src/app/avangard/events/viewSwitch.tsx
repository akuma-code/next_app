import {
    EventDto,
    EventDto2,
    MRTEvent,
} from "@/ClientComponents/MRT/Avangard/MRTEvents";
import { getEventsByMonth, getEventsByMonthDto } from "@/Services/eventService";
import { OrderType } from "./page";
import { MonthTabs } from "@/ClientComponents/Tabs/MonthTabs";
import { EventsList } from "@/ClientComponents/EventsList";
import { getDBManyEventsData } from "@/Services/events/db_event";
import { _log } from "@/Helpers/helpersFns";
import { reducePairs } from "@/Helpers/reduceToObject";

export type TypeOfView = "card" | "table";
export type ViewPayload = EventDto2 | EventDto;
// interface MrtPayload {
//     type: "table";
//     payload: EventDto2[];
// }
// interface CardPayload {
//     type: "card";
//     payload: EventDto[];
// }
interface ViewVariant {
    type: TypeOfView;
    payload?: ViewPayload;
}

type ViewSwitchProps = {
    view: ViewVariant;
    options?: { month?: string; order?: OrderType };
};
const CardView = ({ events }: { events: EventDto[] }) => {
    return (
        <>
            <MonthTabs />
            <EventsList events={ events } />
        </>
    );
};
export async function ViewSwitch(props: ViewSwitchProps) {
    const {
        options = {},
        view: { type },
    } = props;
    const { order, month } = options;
    const monthEvents = await getEventsByMonth(month, order as OrderType);
    const monthEventsDto = await getEventsByMonthDto(month, order as OrderType);
    const { data } = await getDBManyEventsData(
        {
            date_formated: { endsWith: `${month}_2024` },
        },
        ["date_formated", "pairs"]
    );
    switch (type) {
        case "card":
            return <CardView events={ monthEvents } />;
        case "table":
            return <MRTEvent events={ monthEventsDto } />;
        default:
            return <MRTEvent events={ monthEventsDto } />;
    }
};

