'use client'

import { useToggle } from "@/Hooks/useToggle"
import { ColorModeContext } from "@/app/providers"
import { Settings, SettingsTwoTone } from "@mui/icons-material"
import { Dialog, DialogContent, DialogTitle, IconButton, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { useContext, useState } from "react"

type SettingsDialogProps = {
    children?: React.ReactNode
    title?: string
}
export const ModalContainer: React.FC<SettingsDialogProps> = ({ children, title }) => {

    const [open, { on, off }] = useToggle()

    return (
        <>
            <IconButton onClick={ on }><Settings /></IconButton>
            <Dialog open={ open } onClose={ off }>
                <DialogTitle>
                    { title }
                </DialogTitle>
                <DialogContent>
                    { children }

                </DialogContent>
            </Dialog>
        </>
    )
}