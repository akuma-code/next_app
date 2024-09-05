import { Tooltip, IconButton, Avatar, Menu } from "@mui/material";
import { Fragment, useState } from "react";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

//*_________________________________________________________________

const SelectPairButton: React.FC<{ children?: React.ReactNode }> = ({
    children,
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Fragment>
            <Tooltip title="Занятия с тренером">
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
                        sx={{ bgcolor: "primary.dark", width: 32, height: 32 }}
                        variant="circular"
                    >
                        <SupervisorAccountIcon sx={{ color: "primary" }} />
                    </Avatar>
                </IconButton>
            </Tooltip>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
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
                                gap: 1,
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
            >
                {children}
            </Menu>
        </Fragment>
    );
};

SelectPairButton.displayName = "_________Pair Select";

export default SelectPairButton;
