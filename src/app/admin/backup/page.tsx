import { CommonBackup } from "@/Components/Backup/CommonBackup";
import { Box } from "@mui/material";
import { RestoreButtons } from "./RestoreButtons";
import { ClientBackup } from "@/Components/Backup/ClientSideBackup";
import { getAllData } from "@/Services/utils";

export default async function BackupPage({
    searchParams,
}: {
    searchParams: { data: string; log: string };
}) {
    const { data, log } = searchParams;

    return (
        <Box display={"flex"} flexDirection={"column"} gap={2} p={1}>
            <RestoreButtons restore={log} />
            {/* <CommonBackup restore={data} /> */}
            <ClientBackup />
        </Box>
    );
}
