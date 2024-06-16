'use client'

import { PLR } from "@/ClientComponents/UserTable/PlayersMRT"
import { Box, Card, CardHeader, Grid, Paper } from "@mui/material"
import { MRT_Row } from "material-react-table"


const PCContainer = ({ children }: { children?: React.ReactNode }) => {


    return (
        <Card variant="elevation" elevation={ 4 }
            sx={ {

            } }>
            <Paper>
                { children }
            </Paper>
        </Card>)
}

export const RowProfileCard: React.FC<{ row: MRT_Row<PLR> }> = ({ row }) => {
    const { original } = row

    return (
        <PCContainer>
            <Grid >
                <Grid item xs={ 6 } md={ 4 } sx={ { border: '2px solid grey' } }

                >
                    <CardHeader title={ `Имя: ${original.name}` } subheader={ `id: ${original.id}` } />
                </Grid>

            </Grid>
        </PCContainer>
    )
}