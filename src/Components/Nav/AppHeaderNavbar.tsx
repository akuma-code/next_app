import { auth } from '@/auth/auth';
import { ToggleThemeColorButton } from '@/ClientComponents/ToggleThemeButton';
import { NavMenu } from '@/ClientComponents/UI/NavMenu';
import { _log } from '@/Helpers/helpersFns';
import { paths } from '@/paths';
import { getOneUserByEmail } from '@/Services/userService';
import { AppBar, Breadcrumbs, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';


interface AppHeaderProps {

}
const { apiUrl, pageUrl } = paths;

const routes = [

    {
        to: '/avangard/events',
        text: 'Авангард'
    },

]

export async function AppHeader() {

    const session = await auth()
    let user = session?.user?.email ? await getOneUserByEmail({ email: session?.user?.email }) : null

    // _log({ session })

    return (



        <AppBar position='static' color={ 'primary' } elevation={ 4 } sx={ { mb: 1 } }>

            <Toolbar variant='dense' sx={ { display: 'flex' } }>
                <Breadcrumbs separator={ '/' } sx={ { color: 'white', flexGrow: 1 } } >

                    {
                        routes.map(r =>
                            <Typography variant='body1' color={ 'whitesmoke' } key={ r.to }>
                                <Link href={ r.to }>{ r.text }</Link>
                            </Typography>
                        )
                    }
                </Breadcrumbs>

                <Typography textAlign={ 'center' } variant='body2' flexGrow={ 1 }>
                    { session
                        ? ` ${session?.user?.email}`
                        : "Пользователь не авторизован"
                    }
                </Typography>

                <Breadcrumbs separator={ '/' } sx={ { color: 'white', flexGrow: 0 } }>
                    <ToggleThemeColorButton />
                    <NavMenu user_id={ user?.id } />

                    <Typography variant='body1' color={ 'whitesmoke' } alignSelf={ 'center' } textAlign={ 'right' }>
                        <Link href={ pageUrl.admin }> Админка </Link>
                    </Typography>
                </Breadcrumbs>

            </Toolbar>

        </AppBar>

    );
}

