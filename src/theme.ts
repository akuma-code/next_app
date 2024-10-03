'use client';
import { PaletteMode } from '@mui/material';
import { ruRU } from '@mui/material/locale';
import { ruRU as PickersRuru } from '@mui/x-date-pickers/locales';
import { Roboto } from 'next/font/google';
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
        PickersRuru,
        ruRU,
        // ...(mode === 'light'
        //     ? palette.light
        //     : palette.dark

        // ),

    },

});






