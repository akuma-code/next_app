import { auth } from '@/auth/auth';
import { checkAuth } from '@/auth/utils';
import LoginDialog from '@/ClientComponents/auth/LoginDialog';
import { ToggleThemeColorButton } from '@/ClientComponents/ToggleThemeButton';
import { paths } from '@/paths';
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

export const AppHeader: React.FC<AppHeaderProps> = async () => {

    const session = await auth()
    const { isAuth, role } = await checkAuth()


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

                <Typography textAlign={ 'center' } flexGrow={ 1 }>
                    { session
                        ? `user: ${session?.user?.email}, ${session?.user?.role}`
                        : "Пользователь не авторизован"
                    }
                </Typography>

                <Breadcrumbs separator={ '/' } sx={ { color: 'white', flexGrow: 0 } }>
                    {/* <SignInButton /> */ }
                    <ToggleThemeColorButton />
                    <LoginDialog />
                    {
                        role === 'ADMIN' &&

                        <Typography variant='body1' color={ 'whitesmoke' } alignSelf={ 'center' } textAlign={ 'right' }>
                            <Link href={ pageUrl.admin }> Админка </Link>
                        </Typography>
                    }
                </Breadcrumbs>

            </Toolbar>

        </AppBar>

    );
}

