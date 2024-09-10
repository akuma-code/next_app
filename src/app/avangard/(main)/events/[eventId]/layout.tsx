import { Metadata } from "next";

export default function Layout(c: { children: React.ReactNode }) {
    return <div>{c.children}</div>;
}

export const metadata: Metadata = {
    title: "Тренировки",
    description: "Расписание тренировок",
    icons: "favicon.ico",
};
