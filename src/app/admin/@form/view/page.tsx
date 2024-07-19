import { Box } from "@mui/material";




async function ViewPage({ params }: { params: { viewtype: string } }) {

    const { viewtype } = params

    return (
        <Box>__viewtype: { viewtype }</Box>
    )
}


export default ViewPage