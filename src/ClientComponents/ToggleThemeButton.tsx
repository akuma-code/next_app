'use client'

import { ColorModeContext } from "@/app/providers";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { IconButton } from "@mui/material";
import { useContext } from "react";
export const ToggleThemeColorButton = () => {

    const { toggleColorMode } = useContext(ColorModeContext)
    return (
        <IconButton
            onClick={ toggleColorMode }
            color="info"
        >
            <Brightness4Icon />
        </IconButton>
    )
}