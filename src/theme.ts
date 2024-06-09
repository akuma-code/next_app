'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { ruRU } from '@mui/material/locale'
import { PaletteMode, ThemeOptions } from '@mui/material';
import { amber, blue, deepOrange, deepPurple, green, grey, } from '@mui/material/colors';
import { COLOR_LIGHT, COLOR_DARK } from './ColorsTheme';
import palette from './themeOptions';

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
        // mode,

        ...(mode === 'light'
            ? palette.yoma_light
            : palette.dark

        ),
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
