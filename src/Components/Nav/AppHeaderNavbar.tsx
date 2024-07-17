import { auth } from "@/auth/auth";
import { ExitButton } from "@/ClientComponents/UI/ExitButton";
import LinkMui from "@/ClientComponents/UI/LinkMui";
import { NavMenu } from "@/ClientComponents/UI/NavMenu";
import { paths } from "@/paths";
import {
    AppBar,
    Box,
    Breadcrumbs,
    CircularProgress,
    Toolbar,
    Typography,
} from "@mui/material";
import Link from "next/link";
import { Suspense } from "react";

interface AppHeaderProps { }
const { apiUrl, pageUrl } = paths;

const routes = [
    {
        to: "/avangard/events",
        text: "Авангард",
    },
    {
        to: pageUrl.admin,
        text: "Админка",
    },

];

export async function AppHeader() {
    const session = await auth();

    return (
        <AppBar
            position="static"
            color={ "primary" }
            elevation={ 4 }
            sx={ { mb: 1 } }
        >
            <Toolbar variant="regular" sx={ { display: "flex" } }>
                <Breadcrumbs
                    separator={ "/" }
                    sx={ { color: "white", flexGrow: 2 } }
                >
                    { routes.map((r) => (
                        <Link href={ r.to } key={ r.to }>
                            <Typography
                                variant="body2"
                                color={ "whitesmoke" }
                                key={ r.to }
                            >
                                { r.text }
                            </Typography>
                        </Link>
                    )) }
                </Breadcrumbs>
                <Suspense fallback={ <CircularProgress /> }>
                    <Box gap={ 1 } display={ 'flex' } flexGrow={ 1 } justifyContent={ 'end' }>
                        <NavMenu />
                        { session ?
                            <ExitButton />
                            :
                            <LinkMui href="/api/auth/login" color="#00ffaa">
                                Войти
                            </LinkMui>

                        }

                    </Box>

                </Suspense>
            </Toolbar>
        </AppBar>
    );
}
