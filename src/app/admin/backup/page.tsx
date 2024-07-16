import { ClientBackup } from "@/Components/Backup/ClientSideBackup";
import { Box } from "@mui/material";
import { RestoreButtons } from "./RestoreButtons";

export default async function BackupPage({
    searchParams,
}: {
    searchParams: { data: string; log: string };
}) {
    const { log } = searchParams;

    return (
        <Box display={"flex"} flexDirection={"column"} gap={2} p={1}>
            <RestoreButtons restore={log} />
            {/* <CommonBackup restore={data} /> */}
            <ClientBackup />
        </Box>
    );
}
