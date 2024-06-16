import { CommonBackup } from "@/Components/Backup/CommonBackup";
import { Box, Button, ButtonGroup, Divider, Stack } from "@mui/material";
import { RestoreButtons } from "./RestoreButtons";
import { _log } from "@/Helpers/helpersFns";
import Link from "next/link";

export default async function BackupPage({ searchParams }: { searchParams: { data: string, log: string } }) {
    const { data, log } = searchParams;


    return (
        <Box display={ 'flex' } flexDirection={ 'column' } gap={ 2 } p={ 1 }>
            <RestoreButtons restore={ log } />
            <CommonBackup restore={ data } />
        </Box>
    )
}

