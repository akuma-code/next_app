import { Box } from "@mui/material";

interface ContainerLayoutProps {
    children: React.ReactNode
}

const StpLayout: React.FC<ContainerLayoutProps> = ({ children }) => {
    return (
        <Box
            sx={ { background: 'url(../assets/wh40k icons/adeptus-mechanicus.png)' } }
        >
            <img src="../../assets/wh40k icons/adeptus-mechanicus.png" alt="img" />
            { children }
        </Box>
    );
}

export default StpLayout;

