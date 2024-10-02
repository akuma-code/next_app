'use client'

import { createTheme, ThemeOptions } from '@mui/material/styles';
import { light, dark } from '@mui/material/styles/createPalette';
import { info, error } from 'console';
import { text } from 'stream/consumers';
export const themeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#0c2659',
            light: '#262d31',
            dark: '#010626',
            contrastText: '#fff',
        },
        secondary: {
            main: '#b74343',
            light: '#ffebee',
            dark: '#6f0404',
            contrastText: '#ffebee',
        },
        background: {
            default: '#7986cb',
            paper: '#cfd8dc',
        },
        text: {
            disabled: '#010626',

            primary: '#1a237e',
            secondary: '#010314',
        },
        info: {
            main: '#fdd835',
            dark: '#f9a825',
            light: '#fffde7',
        },
        divider: '#183f8c',
        warning: {
            main: '#e07138',
            dark: '#b74c1a',
            light: '#f38758',
        },
        error: {
            main: '#bb0a0a',
            light: '#f86464',
            dark: '#660303',
        },
        success: {
            main: '#779f3c',
            light: '#c7dc5d',
            dark: '#3e6404',
        },
    },
    //   overrides: {
    //     MuiAppBar: {
    //       colorInherit: {
    //         backgroundColor: '#689f38',
    //         color: '#fff',
    //       },
    //     },
    //   },
    //   props: {
    //     MuiAppBar: {
    //       color: 'inherit',
    //     },
    //   },
};


export const akuTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: "data-toolpad-color-scheme",
    },
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: '#0c2659',
                    light: '#262d31',
                    dark: '#010626',
                    contrastText: '#fff',
                },
                secondary: {
                    main: '#b74343',
                    light: '#ffebee',
                    dark: '#6f0404',
                    contrastText: '#ffebee',
                },
                background: {
                    default: '#7986cb',
                    paper: '#cfd8dc',
                },
                text: {
                    disabled: '#010626',

                    primary: '#1a237e',
                    secondary: '#010314',
                },
                info: {
                    main: '#fdd835',
                    dark: '#f9a825',
                    light: '#fffde7',
                },
                warning: {
                    main: '#e07138',
                    dark: '#b74c1a',
                    light: '#f38758',
                },
                error: {
                    main: '#bb0a0a',
                    light: '#f86464',
                    dark: '#660303',
                },
                success: {
                    main: '#779f3c',
                    light: '#c7dc5d',
                    dark: '#3e6404',
                },
                divider: '#183f8c',

            },
        },
        dark: {
            palette: {
                primary: {
                    main: '#0c2659',
                    light: '#cde20b',
                    dark: '#0a0f03',
                    contrastText: '#fff',
                },
                secondary: {
                    main: '#5b9ea3',
                    light: '#7adaf7',
                    dark: '#074d49',
                    contrastText: '#0c2659',
                },
                background: {
                    default: '#c6deec',
                    paper: '#ffffff',
                },
                text: {
                    primary: '#010626',
                    secondary: '#4959c2',
                    disabled: '#010626',

                },
                info: {
                    main: '#ddf037',
                    dark: '#76772f',
                    light: '#f1f397',
                },
                divider: '#183f8c',
                warning: {
                    main: '#e07138',
                    dark: '#b74c1a',
                    light: '#f38758',
                },
                error: {
                    main: '#bb0a0a',
                    light: '#f86464',
                    dark: '#660303',
                },
                success: {
                    main: '#779f3c',
                    light: '#c7dc5d',
                    dark: '#3e6404',
                },
            },
        },
    },

    components: {
        MuiToolbar: { defaultProps: { color: "error" } }
    }
},
    {
        // overrides: {
        //     MuiToolbar: {
        //         colorInherit: {
        //             backgroundColor: '#ffffff',
        //             color: '#000000',
        //         },
        //     },
        // },
        // props: {
        //     MuiAppBar: {
        //         color: 'inherit',
        //     },
        // },
    })