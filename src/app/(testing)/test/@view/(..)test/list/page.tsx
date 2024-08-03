import { mdiEslint } from "@mdi/js";
import Icon from "@mdi/react";
import { Box } from "@mui/material";

async function ListPage1() {
    return (
        <Box>
            @View List page
            <Box
                m={1}
                p={1}
                border="3px inset"
                borderRadius={"1rem"}
                display="flex"
                alignItems={"center"}
                justifyContent={"center"}
                flexDirection={"column"}
                color={"error.dark"}
            >
                <Icon
                    path={mdiEslint}
                    size={4}
                    spin={2}
                    className="m-auto"
                    color={"#012c4e"}
                />
                <span>Loading...</span>
            </Box>
        </Box>
    );
}

export default ListPage1;
