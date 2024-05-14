import { Box, Divider, Stack } from "@mui/material";
import Link from "next/link";
import { PropsWithChildren } from "react";

const AvangardLayout: React.FC<PropsWithChildren> = async ({ children }) => {


    return (

        <Stack direction={ 'row' } spacing={ 4 }>
            <Box maxWidth={ 300 } p={ 1 } display={ 'flex' } flexDirection={ 'column' } gap={ 2 }>
                <Link
                    className="hover:underline"
                    href={ {
                        pathname: '/avangard/players'
                    } }
                >
                    Список игроков
                </Link>
                <Link
                    className="hover:underline"
                    href={ {
                        pathname: '/avangard'
                    } }
                >
                    Календарь
                </Link>
            </Box>
            <Divider flexItem orientation="vertical" ></Divider>
            <Box>

                { children }
            </Box>
        </Stack>

    )
}

export default AvangardLayout