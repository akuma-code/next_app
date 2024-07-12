import {
    EventDto,
    EventDto2,
    MRTEvent,
} from "@/ClientComponents/MRT/Avangard/MRTEvents";
import { getEventsByMonth, getEventsByMonthDto } from "@/Services/eventService";
import { OrderType } from "./page";
import { MonthTabs } from "@/ClientComponents/Tabs/MonthTabs";
import { EventsList } from "@/ClientComponents/EventsList";

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
export const ViewSwitch: React.FC<ViewSwitchProps> = async (props) => {
    const {
        options = {},
        view: { type },
    } = props;
    const { order, month } = options;
    const monthEvents = await getEventsByMonth(month, order as OrderType);
    const monthEventsDto = await getEventsByMonthDto(month, order as OrderType);

    switch (type) {
        case "card":
            return <CardView events={monthEvents} />;
        case "table":
            return <MRTEvent events={monthEventsDto} />;
        default:
            return <MRTEvent events={monthEventsDto} />;
    }
};
export const CardView = ({ events }: { events: EventDto[] }) => {
    return (
        <>
            <MonthTabs />
            <EventsList events={events} />
        </>
    );
};
