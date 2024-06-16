'use client'
import { Tooltip, IconButton, Avatar, Menu } from "@mui/material";
import React, { useState } from "react";
import SupervisorAccountTwoTone from '@mui/icons-material/SupervisorAccountTwoTone'
interface MenuButtonProps {
    title?: string
    icon?: React.ReactNode
    children?: React.ReactNode

}

const MenuButton: React.FC<MenuButtonProps> = ({ children, title, icon }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);

    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Tooltip title={ title }>
                <IconButton
                    onClick={ handleOpen }
                    size="small"
                    sx={ { mx: 1 } }
                    aria-controls={ open ? 'account-menu' : undefined }
                    aria-haspopup="true"
                    aria-expanded={ open ? 'true' : undefined }
                    color='primary'
                >
                    <Avatar sx={ { bgcolor: 'primary.dark', width: 32, height: 32 } } variant='rounded'>
                        { icon ? icon
                            :
                            <SupervisorAccountTwoTone sx={ { color: 'primary' } } />
                        }
                    </Avatar>
                </IconButton>
            </Tooltip>

            <Menu
                anchorEl={ anchorEl }
                id="account-menu"
                open={ open }
                onClose={ handleClose }
                onClick={ handleClose }
                slotProps={ {
                    paper: {
                        elevation: 1,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },

                        }
                    },
                } }
                transformOrigin={ { horizontal: 'right', vertical: 'top' } }
                anchorOrigin={ { horizontal: 'right', vertical: 'bottom' } }
            >

                { children }
            </Menu>

        </React.Fragment>)

}

MenuButton.displayName = "_________Pair Select"


export default MenuButton