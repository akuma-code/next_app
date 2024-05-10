
import EventCalendar from "@/ClientComponents/DateCalendar/EventCalendar";
import { Divider } from "@mui/material";
import { useParams } from "next/navigation";
import { Suspense } from "react";


export default async function AvangardPage() {
    // const { y, m, d } = useParams<{ y: string, m: string, d: string }>()

    return (
        <>

            <EventCalendar />
        </>
    )
}