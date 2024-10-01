import { mdiEslint } from "@mdi/js";
import Icon from "@mdi/react";
import { Box } from "@mui/material";

const LoadSpinner = (props: {
    mdiPath?: string;
    iconColor?: string;
    text?: string;
    size?: number;
}) => {
    const { mdiPath, iconColor, text, size = 2 } = props;

    return (
        <Box
            m={1}
            p={0}
            border="3px inset"
            borderRadius={"1rem"}
            display="flex"
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
            color={"primary"}
        >
            <Icon
                path={mdiPath ?? mdiEslint}
                size={size}
                spin={2}
                // className="m-auto"
                color={iconColor ?? "#012c4e"}
            />
            <span>{text ?? "Loading..."}</span>
        </Box>
    );
};

export default LoadSpinner;
