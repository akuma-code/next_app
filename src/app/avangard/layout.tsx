import { OrderFilterControls } from "@/ClientComponents/UI/Filters/OrderFiltersControl";
import { NavLink } from "@/ClientComponents/UI/NavLink";
import { _formated_date } from "@/Helpers/dateFuncs";
import Icon from "@mdi/react";
import { Box, Divider, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import dayjs from "dayjs";
import { Metadata } from "next";

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

export const metadata: Metadata = {
    title: "Тренировки",
    description: "Расписание тренировок",
    icons: "icon1.ico"

};




const AvangardLayout: React.FC<{ children?: React.ReactNode }> = async ({ children }) => {

    return (

        <Stack direction={ {
            xs: 'column',
            sm: 'row',
        } }
            spacing={ 2 }
        // bgcolor={ 'background' }
        >
            <Box maxWidth={ 250 } p={ 1 } display={ 'flex' } flexDirection={ { xs: 'row', sm: 'column' } }
                sx={ {
                    [`& :hover.MuiTypography-root`]: { textUnderlineOffset: 2, textDecoration: 'underline' }
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
                {/* <Divider flexItem sx={ { m: 1 } }></Divider> */ }
                {/* <OrderFilterControls /> */ }
            </Box>



            { children }

        </Stack>

    )
}

export default AvangardLayout