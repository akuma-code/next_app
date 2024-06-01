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
    {
        href: '/avangard/events/draft',
        label: 'Запись на тренировку'
    },

]


const AvangardLayout: React.FC<{ children?: React.ReactNode }> = async ({ children }) => {

    return (

        <Stack direction={ { sm: 'row', xs: 'column' } } spacing={ 2 }
        // bgcolor={ 'background' }
        >
            <Box maxWidth={ 300 } px={ 1 } display={ 'flex' } flexDirection={ { xs: 'row', sm: 'column' } }
                sx={ {
                    [`& :hover.MuiTypography-root`]: { textUnderlineOffset: 2 }
                } }
            >
                {
                    links.map(item =>
                        <NavLink
                            key={ item.href }
                            href={ item.href }
                        >
                            <Typography variant="body1" component={ 'div' }>{ item.label }</Typography>
                        </NavLink>
                    )
                }

            </Box>



            { children }

        </Stack>

    )
}

export default AvangardLayout