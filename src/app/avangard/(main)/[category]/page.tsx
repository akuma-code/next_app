import { Box } from "@mui/material";

export default async function Page({
    params,
}: {
    params: { category: string; id: string };
}) {
    return (
        <Box>
            {params.category ?? "nO"}
            <br />
            {params.id ?? "nnnn"}
        </Box>
    );
}
