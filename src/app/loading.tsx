import { Box, LinearProgress } from "@mui/material";
import React from "react";

interface LoadingStpProps {

}

const LoadingStp: React.FC<LoadingStpProps> = () => {
    return (
        <Box sx={ { w: '100%', h: '100%', p: 3 } }>
            <LinearProgress variant="indeterminate" color="warning" />
        </Box>
    );
}

export default LoadingStp;