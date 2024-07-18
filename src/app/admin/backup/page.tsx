import { ClientBackup } from "@/Components/Backup/ClientSideBackup";
import { Box } from "@mui/material";
import { RestoreButtons } from "./RestoreButtons";
import { MrtBoundary } from "@/ClientComponents/MRT/MrtBoundary";

export default async function BackupPage({
    searchParams,
}: {
    searchParams: { data: string; log: string };
}) {
    const { log } = searchParams;

    return (
        <MrtBoundary>
            <Box display={ "flex" } flexDirection={ "column" } >


                <ClientBackup />
            </Box>
        </MrtBoundary>
    );
}
