import { ThemeOptions } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#1699e2',
        },
        secondary: {
            main: '#adb8b8',
            light: '#212a2b',
            dark: '#adb8b8',
        },
        background: {
            paper: '#b9b2b2',
        },
        divider: 'rgba(226,209,29,0.12)',
        text: {
            disabled: 'rgba(168,29,29,0.76)',
        },
    },


    typography: {
        body2: {
            lineHeight: 0.99,
        },
    },
};

const props = {
    MuiTooltip: {
        fontSize: 20,
        arrow: true,
    },
    MuiButton: {
        size: 'small',
    },
    MuiButtonGroup: {
        size: 'small',
    },
    MuiCheckbox: {
        size: 'small',
    },
    MuiFab: {
        size: 'small',
    },
    MuiFormControl: {
        margin: 'dense',
        size: 'small',
    },
    MuiFormHelperText: {
        margin: 'dense',
    },
    MuiIconButton: {
        size: 'small',
    },
    MuiInputBase: {
        margin: 'dense',
    },
    MuiInputLabel: {
        margin: 'dense',
    },
    MuiRadio: {
        size: 'small',
    },
    MuiSwitch: {
        size: 'small',
    },
    MuiTextField: {
        margin: 'dense',
        size: 'small',
    },
    MuiList: {
        dense: true,
    },
    MuiMenuItem: {
        dense: true,
    },
    MuiTable: {
        size: 'small',
    },
}