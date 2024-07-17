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
        <Box display={ "flex" } flexDirection={ "column" } gap={ 2 } p={ 1 }>
            <MrtBoundary>

                <RestoreButtons restore={ log } />
                {/* <CommonBackup restore={data} /> */ }
                <ClientBackup />
            </MrtBoundary>
        </Box>
    );
}
