'use client'

import { Month } from "@/Helpers/dateFuncs"
import { useQuerySearch } from "@/Hooks/useQuerySearch"
import { ChromeTabItem, TabsChrome } from "@/mui-treasury/tabs-chrome"
import { Box } from "@mui/material"
import dayjs from "dayjs"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"


const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
const stringifyMonth = (newValue: number) => newValue < 10 ? '0' + (newValue + 1) : `${(newValue + 1)}`
export const MonthTabs = () => {
    const query = useQuerySearch()
    const router = useRouter()
    const pathname = usePathname()
    const [tabNumber, setTab] = useState(dayjs().month())

    function handleChangeTab(event: React.SyntheticEvent, newValue: number) {
        setTab(prev => newValue)
        router.push(pathname + '?' + query('month', stringifyMonth(newValue)))
    }

    const handleClick = (newValue: number) => {
        router.push(pathname + '?' + query('month', stringifyMonth(newValue)))
    }

    return (
        <Box sx={ {
            maxWidth: { sm: 450, md: 600 },
            bgcolor: 'background.default',
            borderTopRightRadius: 8,
            borderTopLeftRadius: 8,
            borderWidth: 2,
            borderColor: '#000',
            borderBottom: 0
        } }

        >

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
                        onClick={ () => handleClick(n) }

                    />
                ) }
            </TabsChrome>
        </Box>

    )
}