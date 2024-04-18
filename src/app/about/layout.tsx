import { Box, Container } from "@mui/material";

interface ContainerLayoutProps {
    children: React.ReactNode
}

const ContainerLayout: React.FC<ContainerLayoutProps> = ({ children }) => {
    return (
        <Box>
            { children }
        </Box>
    );
}

export default ContainerLayout;