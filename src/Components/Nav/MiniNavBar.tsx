"use client";

import React, { useContext } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Icon from "@mdi/react";
import {
    mdiAccountCogOutline,
    mdiAccountDetailsOutline,
    mdiAccountGroupOutline,
    mdiArrowLeftCircle,
    mdiChartBarStacked,
    mdiDatabaseCogOutline,
    mdiDatabaseSyncOutline,
    mdiSecurity,
    mdiThemeLightDark,
    mdiTrophyVariantOutline,
} from "@mdi/js";
import Link from "next/link";
import {
    SignInButton,
    SignOutButton,
} from "@/ClientComponents/auth/SignInButton";
import { ButtonGroup, Stack } from "@mui/material";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { ColorModeContext } from "@/app/providers";
import { User } from "@prisma/client";
import { NavMenu } from "@/ClientComponents/UI/NavMenu";
import useMediaDetect from "@/Hooks/useMediaDetect";

const drawerWidth = 240;
const SegmentIcon = {
    events: <Icon size={1} path={mdiTrophyVariantOutline} />,
    players: <Icon size={1} path={mdiAccountGroupOutline} />,
    players_config: <Icon size={1} path={mdiAccountDetailsOutline} />,
    stats: <Icon size={1} path={mdiChartBarStacked} />,
    admin: <Icon size={1} path={mdiSecurity} />,
    users: <Icon size={1} path={mdiAccountCogOutline} />,
    backup: <Icon size={1} path={mdiDatabaseCogOutline} />,
    compare: <Icon size={1} path={mdiDatabaseSyncOutline} />,
};

type NavItem = {
    href: string;
    label: string;
    icon?: React.ReactNode;
};

const routes: NavItem[] = [
    { href: "/events", label: "Тренировки", icon: SegmentIcon.events },
    { href: "/players", label: "Игроки", icon: SegmentIcon.players },
    { href: "/charts", label: "Сводка", icon: SegmentIcon.stats },
];
const admin_routes: NavItem[] = [
    {
        href: "/admin/players",
        label: "игроки",
        icon: SegmentIcon.players_config,
    },
    { href: "/admin/users", label: "юзеры", icon: SegmentIcon.users },
    { href: "/admin/backup", label: "бэкап", icon: SegmentIcon.backup },
    { href: "/admin/compare", label: "База данных", icon: SegmentIcon.compare },
];

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create(["width", "margin"], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    variants: [
        {
            props: ({ open }) => open,
            style: {
                ...openedMixin(theme),
                "& .MuiDrawer-paper": openedMixin(theme),
            },
        },
        {
            props: ({ open }) => !open,
            style: {
                ...closedMixin(theme),
                "& .MuiDrawer-paper": closedMixin(theme),
            },
        },
    ],
}));

export default function MiniDrawer({ user }: { user?: User }) {
    const session = useSession();
    const theme = useTheme();
    const { isDesktop, isMobile } = useMediaDetect();
    const [open, setOpen] = React.useState(!isMobile);
    const pathname = usePathname();
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const { toggleColorMode } = useContext(ColorModeContext);
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const isPath = (path: string) => path === pathname;
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar
                    component={Stack}
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={[
                            {
                                marginRight: 5,
                            },
                            open && { visibility: "hidden" },
                        ]}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Авангард
                    </Typography>
                    <NavMenu user_id={session.data?.user_id} />
                </Toolbar>
            </AppBar>
            <Toolbar />
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    Закрыть
                    <IconButton onClick={handleDrawerClose}>
                        <Icon path={mdiArrowLeftCircle} size={1} />
                    </IconButton>
                </DrawerHeader>

                <Divider> {open && "Авангард"}</Divider>
                <List>
                    {routes.map((r, index) => (
                        <ListItem
                            key={r.href}
                            disablePadding
                            sx={{ display: "block" }}
                        >
                            <ListItemButton
                                LinkComponent={Link}
                                href={r.href}
                                sx={[
                                    {
                                        minHeight: 48,
                                        px: 2.5,
                                    },
                                    open
                                        ? {
                                              justifyContent: "initial",
                                          }
                                        : {
                                              justifyContent: "center",
                                          },

                                    isPath(r.href)
                                        ? {
                                              bgcolor: "warning.dark",
                                          }
                                        : {
                                              bgcolor: "inherit",
                                          },
                                ]}
                            >
                                <ListItemIcon
                                    sx={[
                                        {
                                            minWidth: 0,
                                            justifyContent: "center",
                                        },
                                        open
                                            ? {
                                                  mr: 3,
                                              }
                                            : {
                                                  mr: "auto",
                                              },
                                    ]}
                                >
                                    {r.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={r.label}
                                    sx={[
                                        open
                                            ? {
                                                  opacity: 1,
                                              }
                                            : {
                                                  opacity: 0,
                                              },
                                    ]}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

                <Divider sx={{ pt: 2, color: "secondary.main" }}>
                    {open && "Админка"}
                </Divider>
                <List>
                    {admin_routes.map((r) => (
                        <ListItem
                            key={r.label}
                            disablePadding
                            sx={{ display: "block" }}
                        >
                            <ListItemButton
                                LinkComponent={Link}
                                href={r.href}
                                sx={[
                                    {
                                        minHeight: 48,
                                        px: 2.5,
                                    },
                                    open
                                        ? {
                                              justifyContent: "initial",
                                          }
                                        : {
                                              justifyContent: "center",
                                          },
                                    isPath(r.href)
                                        ? {
                                              bgcolor: "warning.dark",
                                          }
                                        : {
                                              bgcolor: "inherit",
                                          },
                                ]}
                            >
                                <ListItemIcon
                                    sx={[
                                        {
                                            minWidth: 0,
                                            justifyContent: "center",
                                        },
                                        open
                                            ? {
                                                  mr: 3,
                                              }
                                            : {
                                                  mr: "auto",
                                              },
                                    ]}
                                >
                                    {r.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={r.label}
                                    sx={[
                                        open
                                            ? {
                                                  opacity: 1,
                                              }
                                            : {
                                                  opacity: 0,
                                              },
                                    ]}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}
