'use client'
import { Box, Tab, Tabs } from "@mui/material"
import { useState } from "react"
import LinkMui from "../UI/LinkMui"
import { usePathname, useRouter } from "next/navigation"

export type TabContainerProps = {
    children?: React.ReactNode
    changeQuery?: () => void
}
export interface LinkTabProps {
    label?: string;
    href?: string | { pathname: string, query: object }
    selected?: boolean;
    value: number
}
export const TabContainer: React.FC<TabContainerProps> = ({ children }) => {
    const router = useRouter()
    const pathname = usePathname()
    const [tabNumber, setTab] = useState(0)

    function handleChangeTab(event: React.SyntheticEvent, newValue: number) {
        setTab(prev => newValue)

        const monthNumber = newValue < 10 ? '0' + (newValue + 1) : `${(newValue + 1)}`
        router.push(pathname + `?month=${monthNumber}`)

    }

    return (
        <Box sx={ {
            maxWidth: 500,
        } }>

            <Tabs
                value={ tabNumber }
                onChange={ handleChangeTab }
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
            >
                { children }
            </Tabs>
        </Box>
    )
}


export function LinkTab(props: LinkTabProps) {
    if (typeof props.href !== 'string') {
        const to = props.href?.pathname
        return <Tab
            component="a"
            aria-current={ props.selected && 'page' }
            // LinkComponent={ LinkMui }
            { ...props }
            href={ to }
        />
    }
    return (
        <Tab
            component="a"
            aria-current={ props.selected && 'page' }
            // LinkComponent={ LinkMui }
            { ...props }
            href={ props.href }

        />
    );
}

function samePageLinkNavigation(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
) {
    if (
        event.defaultPrevented ||
        event.button !== 0 || // ignore everything but left-click
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
    ) {
        return false;
    }
    return true;
}