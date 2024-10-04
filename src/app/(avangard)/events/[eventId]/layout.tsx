import { getEvents } from "@/Services/events/eventActions";
import { Metadata } from "next";

export default function Layout(c: { children: React.ReactNode }) {
    return <div>{c.children}</div>;
}
export async function generateStaticParams() {
    const events = await getEvents({ select: { id: true } });
    return events.map((e) => ({ eventId: e.id.toString() }));
}
export const metadata: Metadata = {
    title: "Участники",
    description: "Состав тренировки с тренерами",
};
