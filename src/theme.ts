'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { ruRU } from '@mui/material/locale'
import { PaletteMode, ThemeOptions } from '@mui/material';
import { amber, blue, deepOrange, deepPurple, grey, } from '@mui/material/colors';
import { COLOR_LIGHT, COLOR_DARK } from './ColorsTheme';

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
                    main: '#1c9bce',
                    dark: COLOR_LIGHT.BLUE,
                    light: COLOR_LIGHT.LIGHT_BLUE
                },

                divider: deepPurple[600],
                text: {
                    primary: COLOR_LIGHT.BLACK,
                    secondary: grey['A400'],
                },
                background: {
                    default: COLOR_LIGHT.LIGHT_BLUE,
                    paper: COLOR_LIGHT.WHITE,
                }
            }
            : {
                // palette values for dark mode
                primary: {
                    main: COLOR_DARK.LIGHTGREEN,
                    dark: COLOR_DARK.SALAD,
                    light: COLOR_DARK.YELLOW
                },
                divider: COLOR_DARK.DARKGREEN,
                background: {
                    default: COLOR_DARK.GREY,
                    paper: COLOR_DARK.LIGHTGRAY,
                },
                text: {
                    primary: COLOR_DARK.DARKGREEN,
                    secondary: COLOR_DARK.LIGHTGREEN,

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
