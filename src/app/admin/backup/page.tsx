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
    return (
        <MrtBoundary>
            <Box display={"flex"} flexDirection={"row"} m={2} maxWidth={700}>
                <DescriptionButton
                    action={getImportantData.bind(null, { saveToDisk: false })}
                    title="Сохранить основные данные"
                    description="Сохранение данных по игрокам, тренировкам и парам на диск"
                />
                <ClientBackup />
            </Box>
        </MrtBoundary>
    );
}
