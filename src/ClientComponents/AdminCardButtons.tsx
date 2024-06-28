'use client'

import { Card, CardContent, Grid, Button } from "@mui/material"

export const AdminCard = ({ seedAction }: { seedAction?: () => void }) => {



    return (
        <Card variant="outlined">
            <CardContent component={ Grid } container spacing={ 1 }>
                <Grid item>

                    <Button variant="outlined" color="primary">Promote to master</Button>
                </Grid>
                <Grid item >

                    <Button onClick={ () => seedAction && seedAction() }
                        variant="outlined"
                        color="primary"

                    >
                        Seed masters</Button>
                </Grid>

            </CardContent>
        </Card>
    )
}