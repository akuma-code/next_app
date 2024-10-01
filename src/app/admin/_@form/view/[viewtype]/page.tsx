import { Box } from "@mui/material";




async function PlayersViewPage({ params }: { params: { viewtype: string } }) {

    const { viewtype } = params

    return (
        <Box>on page viewtype: { viewtype }</Box>
    )
}


export default PlayersViewPage