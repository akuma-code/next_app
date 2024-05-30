'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { ruRU } from '@mui/material/locale'
import { PaletteMode, ThemeOptions } from '@mui/material';
import { amber, blue, deepOrange, deepPurple, grey, } from '@mui/material/colors';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});


export const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        contrastThreshold: 4.5,
        typography: {
            fontFamily: roboto.style.fontFamily,
        },
        mode,

        ...(mode === 'light'
            ? {
                // palette values for light mode
                primary: {
                    main: '#119bd1',
                    dark: blue[700],
                    light: blue[300]
                },

                divider: deepPurple[600],
                text: {
                    primary: grey[900],
                    secondary: grey[500],
                },
            }
            : {
                // palette values for dark mode
                primary: deepOrange,
                divider: deepOrange[700],
                background: {
                    default: grey[200],
                    paper: deepPurple[700],
                },
                text: {
                    primary: '#fff',
                    secondary: grey[100],

                },

            }),
    },

});


const theme = createTheme({
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
    palette: {
        primary: {
            main: '#119bd1',
            dark: blue[700],
            light: blue[300]
        },
        secondary: {
            main: '#00008b'
        },
        text: {
            primary: grey[900],
            secondary: grey[700],

        },
        background: {
            default: grey[50],
            paper: '#fff'
        },



    }

}, ruRU,
);



export default theme;
