import { MrtBoundary } from "@/ClientComponents/MRT/MrtBoundary";
import { DescriptionButtonQuery } from "@/ClientComponents/UI/DescButton";
import { ClientBackup } from "@/Components/Backup/ClientSideBackup";
import { sync_events_pairs } from "@/Services/events/db_event";
import { readFileFn } from "@/Services/fs/data_service";
import {
    getImportantData,
    restorePlayers,
} from "@/app/api/backup/events/actions";
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
                    action={restorePlayers}
                    title="RestorePlayers"
                    description="Сохранение данных по игрокам, тренировкам и парам на диск [без айдишников, только строки]"
                />
                {/* <DescriptionButtonQuery
                    action={loadData.bind(null)}
                    title="Вытянуть данные"
                    description="Прочитать данные из data.json"
                /> */}
                <DescriptionButtonQuery
                    action={fetchServerBackup.bind(null)}
                    title="Вытянуть данные c сервера"
                    description="ссылка: https://akumadev-git-auth-akuma-codes-projects.vercel.app/api/backup"
                />
                <DescriptionButtonQuery
                    action={sync_events_pairs.bind(null)}
                    title="Вытянуть events и создать их"
                />
                <DescriptionButtonQuery
                    action={fetchServer}
                    title="/api/db/events"
                />
                <DescriptionButtonQuery
                    action={fetchSS}
                    title="Fetch Google"
                    description="https://script.google.com/macros/s/AKfycbz2FrlUXh0JNFIqc9VT2OBSLUvUdGhRq-6RZ775asudiBdT8DGfS8q5hZ8QIlZCeyfVnA/exec"
                />
            </Box>
        </MrtBoundary>
    );
}

async function loadData() {
    "use server";
    const e = (await readFileFn("./public/json/data.json")) as {
        pairs: any[];
        events: string[];
    }[];
    console.log({ e });
    return e;
}

async function fetchServer() {
    "use server";
    const data = fetch(
        "https://akumadev-git-auth-akuma-codes-projects.vercel.app/api/db/event"
    ).then(
        (r) => r.json(),
        (e) => console.log({ e })
    );
    return data;
}
async function fetchServerBackup() {
    "use server";
    const data = fetch(
        "https://akumadev-git-auth-akuma-codes-projects.vercel.app/api/backup",
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                    "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
        }
    ).then(
        (r) => r.json(),
        (e) => console.log({ e })
    );
    return data;
}
async function fetchSS() {
    "use server";
    const data = fetch(
        "https://script.google.com/macros/s/AKfycbz2FrlUXh0JNFIqc9VT2OBSLUvUdGhRq-6RZ775asudiBdT8DGfS8q5hZ8QIlZCeyfVnA/exec",
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                    "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
        }
    ).then(
        (r) => r.json(),
        (e) => console.log({ e })
    );
    return data;
}
