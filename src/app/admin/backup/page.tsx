import { MrtBoundary } from "@/ClientComponents/MRT/MrtBoundary";
import {
    DescriptionButton,
    DescriptionButtonQuery,
} from "@/ClientComponents/UI/DescButton";
import { ClientBackup } from "@/Components/Backup/ClientSideBackup";
import { fetcher } from "@/Helpers/fetcher";
import {
    fetchAndCreatePlayers,
    sync_events_pairs,
} from "@/Services/events/db_event";
import { readFile } from "@/Services/fs/data_service";
import { getImportantData } from "@/app/api/backup/events/actions";
import { Box } from "@mui/material";
const saveToDisk = process.env.DB_SAVE_TO_HDD === "1";
export default async function BackupPage({
    searchParams,
}: {
    searchParams: { data: string; log: string };
}) {
    return (
        <MrtBoundary>
            <Box
                display={"flex"}
                flexDirection={"row"}
                m={2}
                // maxWidth={800}
                gap={2}
                flexWrap={"wrap"}
            >
                <ClientBackup />
                <DescriptionButtonQuery
                    action={getImportantData.bind(null, { saveToDisk })}
                    title="Сохранить основные данные"
                    description="Сохранение данных по игрокам, тренировкам и парам на диск [без айдишников, только строки]"
                />
                <DescriptionButtonQuery
                    action={loadData.bind(null)}
                    title="Вытянуть данные"
                    description="Прочитать данные из data.json"
                />
                <DescriptionButtonQuery
                    action={fetchServer.bind(null)}
                    title="Вытянуть данные c сервера"
                    description="ссылка: https://akumadev-git-auth-akuma-codes-projects.vercel.app/api/backup/events"
                />
                <DescriptionButtonQuery
                    action={sync_events_pairs.bind(null)}
                    title="Вытянуть events и создать их"
                />
            </Box>
        </MrtBoundary>
    );
}

async function loadData() {
    "use server";
    const e = (await readFile("./public/json/data.json")) as {
        pairs: any[];
        events: string[];
    }[];
    console.log({ e });
    return e;
}

async function fetchServer() {
    "use server";
    const data = fetch(
        "https://akumadev-git-auth-akuma-codes-projects.vercel.app/api/backup/events"
    ).then(
        (r) => r.json(),
        (e) => console.log({ e })
    );
    return data;
}
