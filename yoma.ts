import { ThemeOptions } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#0c2659',
      light: '#262d31',
      dark: '#010626',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f57435',
      light: '#ac8d5f',
      contrastText: '#0c2659',
    },
    background: {
      default: '#c6deec',
      paper: '#ffffff',
    },
    text: {
      primary: '#010626',
      secondary: '#010626',
      disabled: '#010626',

    },
    info: {
      main: '#1ba1bf',
      dark: '#183f8c',
    },
    divider: '#183f8c',
    warning: {
      main: '#e07138',
      dark: '#b74c1a',
      light: '#f38758',
    },
    error: {
      main: '#bb2d0a',
      light: '#f54d25',
      dark: '#a41f01',
    },
    success: {
      main: '#779f3c',
      light: '#c7dc5d',
      dark: '#3e6404',
    },
  },
};