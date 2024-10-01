import { Box } from "@mui/material";

export default async function Template({
    children,
}: {
    children: React.ReactNode;
}) {
    return <Box border={"1px dashed grey"}>{children}</Box>;
}
