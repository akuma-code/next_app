'use client'

import { PaletteOptions } from '@mui/material/styles';


const light: PaletteOptions = {
    mode: 'light',
    primary: {
        main: '#05acff',
        dark: '#01579b',
        light: '#40c4ff',
        contrastText: '#000000',
    },
    secondary: {
        main: '#b71c1c',
        light: '#ef5350',
        dark: '#d50000',
        contrastText: '#eeeeee',
    },
    background: {
        default: '#a1dffb',
        paper: '#eeeeee',
    },
    text: {
        primary: '#1a237e',
        secondary: '#3e2723',
        disabled: '#78909c',
    },
    error: {
        main: '#d50000',
        contrastText: '#ffffff',
        dark: '#c62828',
    },
    warning: {
        main: '#ef6c00',
        light: '#ff9800',
        dark: '#bf360c',
    },
    info: {
        main: '#ffc400',
        contrastText: '#212121',
        light: '#ffe57f',
        dark: '#ff6f00',
    },
    success: {
        main: '#388e3c',
        light: '#81c784',
        dark: '#1b5e20',
    },
    divider: '#311b92',

}

const dark: PaletteOptions = {
    // palette values for dark mode
    mode: 'dark',
    primary: {
        main: '#414344',
        dark: '#01579b',
        light: '#40c4ff',
        contrastText: '#ffffff',
    },
    secondary: {
        main: '#536dfe',
        light: '#82b1ff',
        dark: '#01579b',
        contrastText: '#ff7043',
    },
    background: {
        default: '#121212',
        paper: '#100808',
    },
    text: {
        primary: '#bdbdbd',
        secondary: '#29b6f6',
        disabled: '#cfd8dc',

    },
    error: {
        main: '#d50000',
        contrastText: '#ffffff',
        dark: '#c62828',
    },
    warning: {
        main: '#ef6c00',
        light: '#ff9800',
        dark: '#bf360c',
    },
    info: {
        main: '#ffc400',
        contrastText: '#f5f5f5',
        light: '#ffe57f',
        dark: '#ff6f00',
    },
    success: {
        main: '#388e3c',
        light: '#81c784',
        dark: '#1b5e20',
    },
    divider: '#00a6a6',
}

export default { dark, light }