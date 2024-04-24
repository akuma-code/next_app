import { Box } from "@mui/material";
import StpListView from "./StpList";

interface ContainerLayoutProps {
    children: React.ReactNode
}

const AdminLayout: React.FC<ContainerLayoutProps> = ({ children }) => {
    return (
        <Box>


            { children }

        </Box>
    );
}

export default AdminLayout;

