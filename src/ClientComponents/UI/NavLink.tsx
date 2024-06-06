'use client'

import { Box, Button } from "@mui/material"
import Link from "next/link"
import { usePathname } from "next/navigation"
interface NavLinkProps {
    href: string
    label?: string
    children?: React.ReactNode
}
export const NavLink: React.FC<NavLinkProps> = ({ href, children, label }) => {
    const pathname = usePathname()
    const isActive = pathname === href
    return (
        <Link href={ href } >
            {
                children ?
                    <Box
                        p={ 1 }
                        textAlign={ 'center' }
                        borderRadius={ 3 }
                        color={ isActive ? 'primary.dark' : 'inherit' }
                        bgcolor={ isActive ? 'warning.main' : 'inherit' }
                    >
                        { children }
                    </Box>
                    :
                    <Button
                        variant={ isActive ? "contained" : "outlined" }
                        color="primary"
                    >
                        { label || pathname }
                    </Button>
            }
        </Link>
    )

}