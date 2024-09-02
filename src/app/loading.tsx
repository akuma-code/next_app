import LoadSpinner from "@/ClientComponents/UI/Loader/LoadSpinner";
import { Box, LinearProgress } from "@mui/material";
import React from "react";

interface LoadingStpProps {}

const Loading: React.FC<LoadingStpProps> = () => {
    return <LoadSpinner text="APP LOADING..." />;
};

export default Loading;
