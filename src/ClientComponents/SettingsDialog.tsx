'use client'

import { useToggle } from "@/Hooks/useToggle"
import { ColorModeContext } from "@/app/providers"
import { Settings, SettingsTwoTone } from "@mui/icons-material"
import { Dialog, DialogContent, DialogTitle, IconButton, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { useContext, useState } from "react"

type SettingsDialogProps = {
    open?: boolean,
    onClose?: () => void,
}
export const SettingsDialog: React.FC<SettingsDialogProps> = () => {
    const [mode, setMode] = useState<'dark' | 'light'>('dark')
    const [open, { on, off }] = useToggle()
    const { toggleColorMode } = useContext(ColorModeContext)
    return (
        <>
            <IconButton onClick={ on }><Settings /></IconButton>
            <Dialog open={ open } onClose={ off }>
                <DialogTitle>
                    Settings
                </DialogTitle>
                <DialogContent>
                    <ToggleButton value={ 'theme' } onClick={ toggleColorMode } >Toggle theme</ToggleButton>

                </DialogContent>
            </Dialog>
        </>
    )
}