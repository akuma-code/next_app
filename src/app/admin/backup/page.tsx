import { CommonBackup } from "@/Components/Backup/CommonBackup";
import { Box, Button, ButtonGroup, Divider } from "@mui/material";
import { RestoreButtons } from "./RestoreButtons";

export default async function BackupPage({ searchParams }: { searchParams: { restore: string } }) {
    const { restore } = searchParams;


    return (
        <Box display={ 'flex' } flexDirection={ 'column' }>
            <Divider>
                <RestoreButtons />
            </Divider>
            <CommonBackup />
        </Box>
    )
}