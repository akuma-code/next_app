import { paths } from '@/paths';
import { AppBar, Breadcrumbs, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';


interface AppHeaderProps {

}
const { apiUrl, pageUrl } = paths;

const routes = [
    {
        to: pageUrl.root,
        text: 'Home'
    },
    {
        to: pageUrl.stps,
        text: 'Data list'
    },
    {
        to: pageUrl.users,
        text: 'Users'
    },
    {
        to: '/avangard',
        text: 'Авангард'
    },
    // {
    //     to: '/avangard/players',
    //     text: 'Игроки'
    // }
]

export const AppHeader: React.FC<AppHeaderProps> = async () => {




    return (
        <AppBar position='static' color='primary' >
            <Toolbar variant='dense' >
                <Breadcrumbs separator={ '/' } sx={ { color: 'white', flexGrow: 1 } } >

                    {
                        routes.map(r =>
                            <Typography variant='body1' color={ 'whitesmoke' } key={ r.to }>
                                <Link href={ r.to }>{ r.text }</Link>
                            </Typography>
                        )
                    }
                </Breadcrumbs>

                <Breadcrumbs separator={ '/' } sx={ { color: 'white', flexGrow: 0 } }>
                    <Typography variant='body1' color={ 'whitesmoke' } alignSelf={ 'center' } textAlign={ 'right' }>
                        <Link href={ pageUrl.admin }> Админка </Link>
                    </Typography>
                    {/* <Typography variant='body1' color={ 'whitesmoke' } alignSelf={ 'center' } textAlign={ 'right' }>
                        <Link href={ apiUrl.auth }> Авторизиция </Link>
                    </Typography>
                    <Typography variant='body1' color={ 'whitesmoke' } alignSelf={ 'center' } textAlign={ 'right' }>
                        <Link href={ apiUrl.register }> Регистрация </Link>
                    </Typography>
                    <form
                        action={ async () => {
                            'use server'
                            console.log("signing out")
                            await signOut()
                        } }
                    >
                        <Button
                            variant='contained' color='info' type='submit'
                        >SignOut</Button>
                    </form> */}
                </Breadcrumbs>
            </Toolbar>
        </AppBar>
    );
}

