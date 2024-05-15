import { NavLink } from "@/ClientComponents/UI/NavLink";
import { Box, Divider, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { PropsWithChildren } from "react";


const links = [
    {
        href: '/avangard',
        label: 'Календарь'
    },
    {
        href: '/avangard/events',
        label: 'Тренировки'
    },
    {
        href: '/avangard/players',
        label: 'Игроки'
    },

]

const AvangardLayout: React.FC<PropsWithChildren> = async ({ children }) => {


    return (

        <Stack direction={ 'row' } spacing={ 4 }>
            <Box maxWidth={ 300 } p={ 1 } display={ 'flex' } flexDirection={ 'column' } gap={ 1 }>
                {
                    links.map(item =>
                        <NavLink key={ item.href }
                            href={ item.href }
                        // label={ item.label }
                        >
                            <Typography>{ item.label }</Typography>
                        </NavLink>
                    )
                }

            </Box>
            <Divider flexItem orientation="vertical" ></Divider>
            <Box>

                { children }
            </Box>
        </Stack>

    )
}

export default AvangardLayout