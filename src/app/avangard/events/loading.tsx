import LoadSpinner from "@/ClientComponents/UI/Loader/LoadSpinner";
import { Box, LinearProgress } from "@mui/material";
import React from "react";

interface LoadingStpProps {}

const LoadingStp: React.FC<LoadingStpProps> = () => {
    return <LoadSpinner />;
};

export default LoadingStp;
