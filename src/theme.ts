'use client';
import { PaletteMode } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { ruRU } from '@mui/material/locale';
import { ruRU as PickersRuru } from '@mui/x-date-pickers/locales';
import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';
import palette from './themeOptions';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

export const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        contrastThreshold: 4,
        typography: {
            fontFamily: roboto.style.fontFamily,
        },
        // mode,
        ruRU,
        PickersRuru,
        ...(mode === 'light'
            ? palette.light
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

},
);



export default theme;
