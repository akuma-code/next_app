"use client";

import { backupEvents, getBackupEvents } from "@/app/admin/actions";
import { useQueryBackup } from "@/Hooks/Queries/useQueryBackup";
import { useQueryProduction } from "@/Hooks/Queries/useQueryProductuon";
import {
    Card,
    CardContent,
    Grid,
    Button,
    CardHeader,
    Alert,
} from "@mui/material";

import Link from "next/link";
export const AdminCard = ({
    seedAction,
    actions,
}: {
    seedAction?: () => void;
    actions?: ((...args: any[]) => void)[];
}) => {
    // const [a, b] = actions;
    // const q = useQueryBackup();

    // const prod = useQueryProduction();

    return (
        <Card variant="outlined">
            <Alert variant="outlined" color="error">
                {/* {prod.error && prod?.error?.message} */}
            </Alert>
            {/* <div>{q?.error?.message}</div> */}
            <CardContent component={Grid} container spacing={1}>
                <Grid item>
                    <Link href={{ query: { show: "true" } }}>
                        <Button variant={"outlined"}>Показать бэкап</Button>
                    </Link>
                    <Link href={{ query: { show: "false" } }}>
                        <Button variant={"outlined"}>скрыть бэкап</Button>
                    </Link>
                </Grid>
                <Grid item>
                    <Button
                        onClick={() => seedAction && seedAction()}
                        variant="outlined"
                        color="primary"
                    >
                        Reseed
                    </Button>
                </Grid>
            </CardContent>
        </Card>
    );
};
