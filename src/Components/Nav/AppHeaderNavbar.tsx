import { AppBar, Breadcrumbs, Paper, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';


interface AppHeaderProps {

}

const routes = [
    {
        to: '/',
        text: 'Home'
    },
    {
        to: '/about',
        text: 'About'
    },
    {
        to: '/stp_data',
        text: 'Data list'
    },
    {
        to: '/api/admin',
        text: 'admin'
    },
]

export const AppHeader: React.FC<AppHeaderProps> = () => {
    return (
        <AppBar position='static' color='primary' >
            <Toolbar variant='dense'>
                <Breadcrumbs separator={ '/' } sx={ { color: 'white' } }>

                    {
                        routes.map(r =>
                            <Typography variant='body1' color={ 'whitesmoke' } key={ r.to }>
                                <Link href={ r.to }>{ r.text }</Link>
                            </Typography>
                        )
                    }

                </Breadcrumbs>
            </Toolbar>
        </AppBar>
    );
}

