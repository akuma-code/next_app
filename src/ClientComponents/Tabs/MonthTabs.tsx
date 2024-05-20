'use client'

import { Box, SvgIcon, Tab, Tabs } from "@mui/material"
import { TabContainer } from "./EventLayoutTabs"
import { Month } from "@/Helpers/dateFuncs"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import dayjs from "dayjs"
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { ChromeTabItem, TabsChrome } from "@/mui-treasury/tabs-chrome"


const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
const stringifyMonth = (newValue: number) => newValue < 10 ? '0' + (newValue + 1) : `${(newValue + 1)}`
export const MonthTabs = () => {
    const router = useRouter()
    const pathname = usePathname()
    const [tabNumber, setTab] = useState(dayjs().month())

    function handleChangeTab(event: React.SyntheticEvent, newValue: number) {
        setTab(prev => newValue)
        router.push(pathname + `?month=${stringifyMonth(newValue)}`)
    }
    useEffect(() => {
        router.push(pathname + `?month=${stringifyMonth(tabNumber)}`)
    }, [])
    return (
        <Box sx={ {
            maxWidth: 500,
            bgcolor: '#4d4d4d',
            borderTopRightRadius: 8,
            borderTopLeftRadius: 8
        } }>

            <TabsChrome
                value={ tabNumber }
                onChange={ handleChangeTab }
                variant="scrollable"


            >
                { numbers.map(n =>
                    <ChromeTabItem
                        key={ Month[n] }
                        value={ n }
                        label={ Month[n] }

                    />
                ) }
            </TabsChrome>
        </Box>

    )
}