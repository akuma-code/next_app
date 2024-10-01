'use client';

import { deepOrange, deepPurple, grey, green } from "@mui/material/colors";

export const enum COLOR_DARK {
    BLACK = '#060309',
    GREY = '#3b3937',
    WHITE = '#e0deda',
    SALAD = '#dafc02',
    DARKGREEN = '#12300a',
    YELLOW = '#efe710',
    LIGHTGREEN = '#465c16',
    LIGHTGRAY = '#6e7170'
}
export const enum COLOR_LIGHT {
    MAINBLUE = '#1c9bce',
    BLACK = '#060309',
    DARKBLUE = '#0c2370',
    LIGHTBLUE = '#00aeea',
    WHITE = '#fefefe',

}


const yomaThemeColors = {
    dark: {
        primary: {
            main: COLOR_LIGHT.MAINBLUE,
            dark: COLOR_LIGHT.DARKBLUE,
            light: COLOR_LIGHT.LIGHTBLUE
        },
        info: { main: deepOrange['A400'] },
        divider: deepPurple[600],
        text: {
            primary: COLOR_LIGHT.BLACK,
            secondary: grey['A400'],
            info: '#fff'
        },
        background: {
            default: COLOR_LIGHT.LIGHTBLUE,
            paper: COLOR_LIGHT.WHITE,
        }
    },
    light: {
        primary: {
            main: COLOR_DARK.LIGHTGREEN,
            dark: COLOR_DARK.SALAD,
            light: COLOR_DARK.YELLOW
        },
        info: { main: COLOR_LIGHT.LIGHTBLUE },
        divider: COLOR_DARK.DARKGREEN,
        background: {
            default: COLOR_DARK.GREY,
            paper: COLOR_DARK.LIGHTGRAY,
        },
        text: {
            primary: COLOR_DARK.DARKGREEN,
            secondary: green['A700'],

        },
    }
}