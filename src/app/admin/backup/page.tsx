import { ClientBackup } from "@/Components/Backup/ClientSideBackup";
import { Box, Button } from "@mui/material";
import { RestoreButtons } from "./RestoreButtons";
import { MrtBoundary } from "@/ClientComponents/MRT/MrtBoundary";
import Link from "next/link";

export default async function BackupPage({
    searchParams,
}: {
    searchParams: { data: string; log: string };
}) {
    const { log } = searchParams;

    return (
        <MrtBoundary>
            <Box display={"flex"} flexDirection={"column"} m={2}>
                <Link href="/api/backup/pairs/update">
                    <Button variant="contained">Update Pairs</Button>
                </Link>

                <ClientBackup />
            </Box>
        </MrtBoundary>
    );
}
