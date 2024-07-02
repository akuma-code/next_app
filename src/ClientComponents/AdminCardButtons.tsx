"use client";

import { Card, CardContent, Grid, Button } from "@mui/material";
import Link from "next/link";
export const AdminCard = ({ seedAction }: { seedAction?: () => void }) => {
    return (
        <Card variant="outlined">
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
