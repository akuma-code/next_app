import { ClientBackup } from "@/Components/Backup/ClientSideBackup";
import { Box, Button } from "@mui/material";
import { RestoreButtons } from "./RestoreButtons";
import { MrtBoundary } from "@/ClientComponents/MRT/MrtBoundary";
import Link from "next/link";
import { DescriptionButton } from "@/ClientComponents/UI/DescButton";
import { getPlayers } from "@/Services/playerService";
import { getImportantData } from "@/app/api/backup/events/actions";

export default async function BackupPage({
    searchParams,
}: {
    searchParams: { data: string; log: string };
}) {
    const saveToDisk = process.env.DB_SAVE_TO_HDD === "1";
    // const action = test.bind(null);
    return (
        <MrtBoundary>
            <Box
                display={"flex"}
                flexDirection={"row"}
                m={2}
                maxWidth={800}
                gap={2}
            >
                <ClientBackup />
                <DescriptionButton
                    action={getImportantData.bind(null, { saveToDisk })}
                    title="Сохранить основные данные"
                    description="Сохранение данных по игрокам, тренировкам и парам на диск"
                />
                {/* <DescriptionButton
                    action={action}
                    title="Вытянуть данные из /public"
                    description="тест вытягивания данных из public"
                /> */}
            </Box>
        </MrtBoundary>
    );
}

async function test() {
    "use server";
    console.clear();
    const data = await fetch("/api/backup/events", {
        headers: {
            "Content-Type": "application/json",
        },
    }).then((r) => r.json());
    console.log({ data });
    return data;
}
