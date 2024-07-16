"use client";
import { Tooltip, IconButton, Avatar, Menu, Button } from "@mui/material";
import React, { useMemo, useState } from "react";
import SupervisorAccountTwoTone from "@mui/icons-material/SupervisorAccountTwoTone";
interface MenuButtonProps {
    title?: string;
    icon?: React.ReactNode;
    children?: React.ReactNode;
    avatar_bg?: string;
    asButton?: boolean;
}

const MenuIconButton: React.FC<MenuButtonProps> = ({
    children,
    title,
    icon,
    avatar_bg,
    asButton,
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const MemoButton = useMemo(() => {
        return asButton ? (
            <Button
                startIcon={icon}
                onClick={handleOpen}
                color={"secondary"}
                variant="outlined"
                size={"small"}
            >
                {title}
            </Button>
        ) : (
            <IconBtn
                avatar_bg={avatar_bg}
                icon={icon}
                open={open}
                handleOpen={handleOpen}
            />
        );
    }, [asButton, avatar_bg, icon, open, title]);
    return (
        <React.Fragment>
            <Tooltip title={title}>
                {/* <IconBtn avatar_bg={avatar_bg} icon={icon} open={open} handleOpen={handleOpen}/>  */}
                {MemoButton}
            </Tooltip>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 1,
                        sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: 1.5,
                            "& .MuiAvatar-root": {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            "&::before": {
                                content: '""',
                                display: "block",
                                position: "absolute",
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: "background.paper",
                                transform: "translateY(-50%) rotate(45deg)",
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                {children}
            </Menu>
        </React.Fragment>
    );
};

MenuIconButton.displayName = "_________IconButtonMenu";

export default MenuIconButton;

function IconBtn({
    avatar_bg,
    handleOpen,
    icon,
    open,
}: {
    handleOpen: (event: React.MouseEvent<HTMLElement>) => void;
    open: boolean;
    avatar_bg: string | undefined;
    icon:
        | string
        | number
        | bigint
        | boolean
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | Iterable<React.ReactNode>
        | React.ReactPortal
        | Promise<React.AwaitedReactNode>
        | null
        | undefined;
}) {
    return (
        <IconButton
            onClick={handleOpen}
            size="small"
            sx={{ mx: 1 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            color="primary"
        >
            <Avatar
                sx={{
                    bgcolor: avatar_bg ?? "primary.dark",
                    width: 32,
                    height: 32,
                }}
                variant="rounded"
            >
                {icon ? (
                    icon
                ) : (
                    <SupervisorAccountTwoTone sx={{ color: "primary" }} />
                )}
            </Avatar>
        </IconButton>
    );
}
