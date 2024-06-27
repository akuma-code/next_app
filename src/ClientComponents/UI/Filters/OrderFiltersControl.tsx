'use client'

import Icon from "@mdi/react";
import { ToggleButtonGroup, ToggleButton, SvgIcon, Stack, Divider, IconButton, Paper } from "@mui/material";
import { useCallback, useState } from "react";
import { mdiSortBoolDescending, mdiSortBoolAscending } from '@mdi/js'
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LinkMui from "../LinkMui";
import { DatePicker, DateValidationError, PickerChangeHandlerContext } from "@mui/x-date-pickers";
import { stringifyMonth } from "@/Helpers/dateFuncs";
import dayjs from "dayjs";
import { _log } from "@/Helpers/helpersFns";
export interface FilterState {
    order: "asc" | "desc" | null
    month: number
}

export function OrderFilterControls() {

    const [filters, setFilters] = useState<FilterState>({ order: 'asc', month: dayjs().month() })
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()


    function handleSortOrder(e: any, value: FilterState['order']) {
        setFilters(prev => ({ ...prev, order: value }))
        const search = value ? createQueryString('order', value) : ""

        value !== null
            ? router.push(`${pathname}?${search}`)
            : router.push(pathname)

    }
    function handleChangeDate(value: dayjs.Dayjs | null, context: PickerChangeHandlerContext<DateValidationError>) {
        const search = createQueryString('month', stringifyMonth(dayjs(value).month()))

        setFilters(prev => ({ ...prev, month: dayjs(value).month() }))
        router.push(`${pathname}?${search}`)
        // router.push('?month=' + stringifyMonth(dayjs(value).month()))
    }

    const createQueryString = useCallback((name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(name, value)

        return params.toString()
    },
        [searchParams]
    )
    return (
        <Paper variant="outlined" sx={ { justifyContent: 'center', display: 'flex', direction: 'row' } }>


            <Stack alignItems={ 'center' } spacing={ 1 } direction={ 'row' } p={ 1 } justifySelf={ 'center' } flexGrow={ 1 }
            >
                {/* <Divider flexItem>Сортировка</Divider> */ }
                <ToggleButtonGroup orientation={ "horizontal" }
                    exclusive
                    value={ filters.order }
                    onChange={ handleSortOrder }
                    // color="secondary"
                    // fullWidth
                    size="small"
                    sx={ {
                        [`& .Mui-selected`]: { bgcolor: "primary.light", color: "primary.contrastText" }
                    } }
                >
                    <ToggleButton
                        title="По убыванию"
                        value='asc'
                        selected={ filters.order === 'asc' }
                        sx={ { p: 1, display: 'flex', justifyContent: 'space-between' } }

                    >

                        <Icon path={ mdiSortBoolAscending } size={ 1 } title={ 'asc' } />
                        {/* <code>По убыванию</code> */ }
                    </ToggleButton>

                    <ToggleButton
                        title="По возрастанию"
                        value='desc'
                        selected={ filters.order === 'desc' }
                        sx={ { p: 1, display: 'flex', justifyContent: 'space-between' } }
                    >
                        <Icon path={ mdiSortBoolDescending } size={ 1 } title={ 'desc' } />
                        {/* <code>По возрастанию</code> */ }

                    </ToggleButton>


                </ToggleButtonGroup>
                {/* <Divider flexItem>Выбор даты</Divider> */ }
                <DatePicker
                    views={ ['month'] }
                    selectedSections={ "month" }
                    // value={ dayjs(filters.month) }
                    onChange={ handleChangeDate }
                    name="month"
                    openTo="month"
                    label="Укажите месяц"
                    slotProps={ {
                        layout: {
                            sx: {
                                mt: 1,
                                color: '#000000',
                                borderRadius: '4px',
                                borderWidth: '3px',
                                borderColor: '#2196f3',
                                border: '3px solid',
                                backgroundColor: '#90caf9',
                            }
                        },
                        openPickerIcon: {
                            color: "success"
                        },
                        textField: { size: 'small' }
                    } }
                // slots={ { clearButton: IconButton } }

                />
            </Stack>
        </Paper>
    );
}