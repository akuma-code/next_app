import LoadSpinner from "@/ClientComponents/UI/Loader/LoadSpinner";
import { Box, CircularProgress, LinearProgress, Stack } from "@mui/material";
import React from "react";

interface LoadingStpProps {}

const LoadingStp: React.FC<LoadingStpProps> = () => {
    return (
        <Box
            component={Stack}
            justifyContent={"center"}
            alignContent={"center"}
            textAlign={"center"}
            width={"100%"}
        >
            <CircularProgress
                variant="indeterminate"
                color="warning"
                sx={{ m: "auto" }}
                size={150}
            />
        </Box>
    );
};

export default LoadSpinner.bind(null, {
    text: "Загрузка....",
    iconColor: "orange",
});
