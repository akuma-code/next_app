'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { ruRU } from '@mui/material/locale'
import { PaletteMode } from '@mui/material';
import { amber, deepOrange, grey } from '@mui/material/colors';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const theme = createTheme({
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
    palette: {
        mode: 'dark',

        // palette values for dark mode
        primary: deepOrange,
        divider: deepOrange[700],
        background: {
            default: deepOrange[900],
            paper: deepOrange[900],
        },
        text: {
            primary: '#fff',
            secondary: grey[500],
        },

    }

}, ruRU,
);

const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // palette values for light mode
                primary: amber,
                divider: amber[200],
                text: {
                    primary: grey[900],
                    secondary: grey[800],
                },
            }
            : {
                // palette values for dark mode
                primary: deepOrange,
                divider: deepOrange[700],
                background: {
                    default: deepOrange[900],
                    paper: deepOrange[900],
                },
                text: {
                    primary: '#fff',
                    secondary: grey[500],
                },
            }),
    },
});


export default theme;
