import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import BlurLinearIcon from "@mui/icons-material/BlurLinear";
import Link from "next/link";

async function PlayersLayout({ children }: { children: React.ReactNode }) {
    return (
        <Box p={2}>
            <AppBar position="relative" sx={{ mb: 2 }}>
                <Toolbar variant="dense">
                    <Link href={{ query: { view: "list" } }}>
                        <IconButton edge="start" color="warning">
                            <MenuIcon />
                        </IconButton>
                    </Link>
                    <Link href={{ query: { view: "table" } }}>
                        <IconButton edge="start">
                            <BlurLinearIcon color="warning" />
                        </IconButton>
                    </Link>
                </Toolbar>
            </AppBar>
            {children}
        </Box>
    );
}

export default PlayersLayout;
