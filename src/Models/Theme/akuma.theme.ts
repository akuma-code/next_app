'use client'

import { ruRU } from '@mui/material/locale';
import { createTheme } from '@mui/material/styles';
import { ruRU as PickersRuru } from '@mui/x-date-pickers/locales';

export const akuTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: "data-toolpad-color-scheme",
    },
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: '#0c2659',
                    light: '#1f3746',
                    dark: '#010626',
                    contrastText: '#fff',
                },
                secondary: {
                    main: '#066e8d',
                    light: '#6dd5f5',
                    dark: '#043646',
                    contrastText: '#ffebee',
                },
                background: {
                    default: '#c5cefc',
                    paper: '#cfd8dc',
                },
                text: {
                    disabled: '#010626',

                    primary: '#1a237e',
                    secondary: '#010314',
                },
                info: {
                    main: '#8a7206',
                    dark: '#383002',
                    light: '#fcd199',
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
        dark: true,
        // {
        //     palette: {
        //         primary: {
        //             main: '#0c2659',
        //             light: '#97bef0',
        //             dark: '#0a0f03',
        //             contrastText: '#cecece',
        //         },
        //         secondary: {
        //             main: '#5b9ea3',
        //             light: '#7adaf7',
        //             dark: '#074d49',
        //             contrastText: '#0c2659',
        //         },
        //         background: {
        //             default: '#c6deec',
        //             paper: '#ffffff',
        //         },
        //         text: {
        //             primary: '#010626',
        //             secondary: '#4959c2',
        //             disabled: '#010626',

        //         },
        //         info: {
        //             main: '#ddf037',
        //             dark: '#76772f',
        //             light: '#f1f397',
        //         },
        //         divider: '#183f8c',
        //         warning: {
        //             main: '#e07138',
        //             dark: '#b74c1a',
        //             light: '#f38758',
        //         },
        //         error: {
        //             main: '#bb0a0a',
        //             light: '#f86464',
        //             dark: '#660303',
        //         },
        //         success: {
        //             main: '#779f3c',
        //             light: '#c7dc5d',
        //             dark: '#3e6404',
        //         },
        //     },
        // },
    },
    components: {
        // MuiAppBar: {
        //     styleOverrides: {
        //         root: {
        //             backgroundColor: 'red'
        //         }
        //     }
        // },
        // MuiDrawer: {
        //     styleOverrides: {

        //         paper: {
        //             backgroundColor: "whitesmoke",
        //             maxWidth: 200
        //         },


        //     },
        //     defaultProps: { variant: 'temporary' }
        // },



    }
},
    ruRU, PickersRuru

)


export const theme_with_overrides = createTheme({

    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'red'
                }
            }
        },
        MuiDrawer: {
            styleOverrides: {
                modal: {},
                paper: {
                    backgroundColor: akuTheme.palette.info.main,
                }
            },
            defaultProps: { variant: 'permanent' }
        },

    }
})