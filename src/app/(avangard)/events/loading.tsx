import LoadSpinner from "@/ClientComponents/UI/Loader/LoadSpinner";
import React from "react";

interface LoadingStpProps { }

const LoadingStp: React.FC<LoadingStpProps> = () => {
    return <LoadSpinner text="Тренировки загружаются" />;
};

export default LoadingStp;
