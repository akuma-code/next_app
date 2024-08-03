import { NavLink } from "@/ClientComponents/UI/NavLink";
import {
    Box,
    Stack,
    Typography
} from "@mui/material";
import { Metadata } from "next";

const links = [

    {
        href: "/avangard/events",
        label: "Тренировки",
    },
    {
        href: "/avangard/players",
        label: "Игроки",
    },
    // {
    //     href: "/avangard/events/draft",
    //     label: "Запись на тренировку",
    // },
];

export const metadata: Metadata = {
    title: "Тренировки",
    description: "Расписание тренировок",
    icons: "icon.ico",
};

const AvangardLayout: React.FC<{
    children?: React.ReactNode;
}> = async ({ children }) => {
    return (
        <aside>

            <Stack
                direction={ {
                    sm: "column",
                    md: "row",
                } }
            // spacing={ 1 }
            // bgcolor={ 'background' }
            >
                <Box flexGrow={ 1 }
                    maxWidth={ { md: 200, xs: 500 } }
                    pt={ 1 }
                    display={ "flex" }
                    flexDirection={ { xs: "row", md: "column" } }
                    sx={ {
                        [`& :hover.MuiTypography-root`]: {
                            textUnderlineOffset: 1,
                            textDecoration: "underline",
                        },
                        alignSelf: { xs: 'center', md: 'start' }
                    } }
                >
                    { links.map((item) => (
                        <NavLink key={ item.href } href={ item.href }>
                            <Typography variant="body1" component={ "div" }>
                                { item.label }
                            </Typography>
                        </NavLink>
                    )) }

                </Box>
                <Box flexGrow={ 1 }>

                    { children }
                </Box>
            </Stack>
            <div id="modal-root" />
        </aside>
    );
};

export default AvangardLayout;
