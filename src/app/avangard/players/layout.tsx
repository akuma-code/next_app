import { AppBar, Box, IconButton, Toolbar } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import BlurLinearIcon from '@mui/icons-material/BlurLinear';




async function PlayersLayout({ children }: { children: React.ReactNode }) {
    return (
        <Box>
            <AppBar position="relative" sx={ { mb: 2 } }>
                <Toolbar variant="dense">
                    <IconButton edge='start' color="warning">
                        <MenuIcon />
                    </IconButton>
                    <IconButton edge='start'>
                        <BlurLinearIcon color="warning" />
                    </IconButton>
                </Toolbar>
            </AppBar>
            { children }
        </Box>
    )
}

export default PlayersLayout