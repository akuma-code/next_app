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

}: {
    seedAction?: () => void;

}) => {


    return (
        <Card variant="outlined">
            <Alert variant="outlined" color="error">

            </Alert>

            <CardContent component={ Grid } container spacing={ 1 }>
                <Grid item>
                    <Link href={ { query: { show: "true" } } }>
                        <Button variant={ "outlined" }>Показать бэкап</Button>
                    </Link>
                    <Link href={ { query: { show: "false" } } }>
                        <Button variant={ "outlined" }>скрыть бэкап</Button>
                    </Link>
                </Grid>
                { seedAction &&
                    <Grid item>
                        <Button
                            onClick={ seedAction }
                            variant="outlined"
                            color="primary"
                        >
                            Reseed
                        </Button>
                    </Grid>
                }
            </CardContent>
        </Card>
    );
};
