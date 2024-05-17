import { NavLink } from "@/ClientComponents/UI/NavLink";
import { Box, Divider, Stack, Typography } from "@mui/material";


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

const AvangardLayout: React.FC<{ children?: React.ReactNode }> = async ({ children }) => {


    return (

        <Stack direction={ { sm: 'row', xs: 'column' } } spacing={ 4 }>
            <Box maxWidth={ 300 } p={ 1 } display={ 'flex' } flexDirection={ { xs: 'row', sm: 'column' } } >
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


            { children }

        </Stack>

    )
}

export default AvangardLayout