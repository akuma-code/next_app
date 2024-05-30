import { NavLink } from "@/ClientComponents/UI/NavLink";
import { _formated_date } from "@/Helpers/dateFuncs";
import { Box, Divider, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";

const today = _formated_date(dayjs())
const links = [
    // {
    //     href: '/avangard/' + today,
    //     label: 'Новая'
    // },
    // {
    //     href: '/avangard?date=' + today,
    //     label: 'Календарь'
    // },
    // {
    //     href: '/avangard/events/create',
    //     label: 'Добавить'
    // },
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

        <Stack direction={ { sm: 'row', xs: 'column' } } spacing={ 2 }>
            <Box maxWidth={ 300 } px={ 1 } display={ 'flex' } flexDirection={ { xs: 'row', sm: 'column' } } >
                {
                    links.map(item =>
                        <NavLink
                            key={ item.href }
                            href={ item.href }

                        >
                            <Typography>{ item.label }</Typography>
                        </NavLink>
                    )
                }

            </Box>



            { children }

        </Stack>

    )
}

export default AvangardLayout