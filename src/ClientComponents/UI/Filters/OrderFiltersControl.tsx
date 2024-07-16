"use client";

import { useQuerySearch } from "@/Hooks/useQuerySearch";
import {
    mdiCard,
    mdiChartTimeline,
    mdiCloseOctagon,
    mdiSortBoolAscending,
    mdiSortBoolDescending
} from "@mdi/js";
import Icon from "@mdi/react";
import {
    Paper,
    Stack,
    ToggleButton,
    ToggleButtonGroup
} from "@mui/material";
import {
    BaseSingleInputFieldProps,
    DateValidationError,
    FieldSection
} from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

//TODO: textfield=>button
//TODO: handle filteration
//TODO: сделать promotion player->master
//TODO: сделать вывод количества ивентов в окошке выбора месяца

export interface FilterState {
    order: "asc" | "desc" | null;
    month: number;
    view: "card" | "table" | null;
}

export function OrderFilterControls() {
    const [filters, setFilters] = useState<FilterState>({
        order: "asc",
        month: dayjs().month(),
        view: "card",
    });
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const qcreate = useQuerySearch(searchParams.toString());
    const [_days, setDays] = useState<number[]>([1, 13, 22]);
    const [open, setOpen] = useState(false);

    function handleSortOrder(e: any, value: FilterState["order"]) {
        setFilters((prev) => ({ ...prev, order: value }));
        const search = value ? qcreate("order", value) : "";

        value !== null
            ? router.replace(`${pathname}?${search}`)
            : router.replace(pathname);
    }
    // function handleChangeDate(
    //     value: Dayjs | null
    //     //  context: PickerChangeHandlerContext<DateValidationError>
    // ) {
    //     setFilters((prev) => ({ ...prev, month: dayjs(value).month() }));
    //     const search = qcreate("month", stringifyMonth(dayjs(value).month()));

    //     router.replace(`${pathname}?${search}`);
    //     // router.replace('?month=' + stringifyMonth(dayjs(value).month()))
    // }
    function handleViewChange(e: any, view: FilterState["view"]) {
        const v = view ? view : "table"
        const path = `${pathname}?${qcreate("view", v)}`;
        router.replace(path);
        setFilters((prev) => ({ ...prev, view: v }));
    }
    return (
        <Paper
            variant="outlined"
            sx={ { justifyContent: "center", display: "flex", direction: "row" } }
        >
            <Stack
                alignItems={ "center" }
                spacing={ 1 }
                direction={ "row" }
                p={ 1 }
                justifySelf={ "center" }
                flexGrow={ 1 }
            >
                <ToggleButtonGroup
                    orientation={ "horizontal" }
                    exclusive
                    value={ filters.order }
                    onChange={ handleSortOrder }
                    size="small"
                    sx={ {
                        [`& .Mui-selected`]: {
                            bgcolor: "primary.light",
                            color: "primary.contrastText",
                        },
                    } }
                >
                    <ToggleButton
                        title="По убыванию"
                        value="asc"
                        selected={ filters.order === "asc" }
                        sx={ {
                            p: 1,
                            display: "flex",
                            justifyContent: "space-between",
                        } }
                    >
                        <Icon
                            path={ mdiSortBoolAscending }
                            size={ 1 }
                            title={ "asc" }
                        />
                        {/* <code>По убыванию</code> */ }
                    </ToggleButton>

                    <ToggleButton
                        title="По возрастанию"
                        value="desc"
                        selected={ filters.order === "desc" }
                        sx={ {
                            p: 1,
                            display: "flex",
                            justifyContent: "space-between",
                        } }
                    >
                        <Icon
                            path={ mdiSortBoolDescending }
                            size={ 1 }
                            title={ "desc" }
                        />
                        {/* <code>По возрастанию</code> */ }
                    </ToggleButton>
                </ToggleButtonGroup>
                <ToggleButtonGroup
                    orientation={ "horizontal" }
                    exclusive
                    value={ filters.view }
                    onChange={ handleViewChange }
                >
                    <ToggleButton
                        value="card"
                        color="secondary"
                        title="Представление: Карточки"
                        sx={ {
                            p: 1,
                            display: "flex",
                            justifyContent: "space-between",
                        } }
                    >
                        <Icon path={ mdiCard } size={ 1 } />
                    </ToggleButton>
                    <ToggleButton
                        value="table"
                        color="secondary"
                        title="Представление: Таблица"
                        sx={ {
                            p: 1,
                            display: "flex",
                            justifyContent: "space-between",
                        } }
                    >
                        <Icon path={ mdiChartTimeline } size={ 1 } />
                    </ToggleButton>
                </ToggleButtonGroup>
            </Stack>
        </Paper>
    );
}

// function highlightDate(
//     props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }
// ) {
//     const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

//     const isSelected =
//         !props.outsideCurrentMonth &&
//         highlightedDays.indexOf(props.day.date()) >= 0;

//     return (
//         <Badge
//             key={props.day.toString()}
//             overlap="circular"
//             badgeContent={isSelected ? "🌚" : undefined}
//         >
//             <PickersDay
//                 {...other}
//                 outsideCurrentMonth={outsideCurrentMonth}
//                 day={day}
//                 sx={{ bgcolor: isSelected ? "red" : "inherit" }}
//             />
//         </Badge>
//     );
// }

interface CIProps
    extends BaseSingleInputFieldProps<
        Dayjs | null,
        Dayjs,
        FieldSection,
        false,
        DateValidationError
    > { }

function CloseIcon(props: CIProps) {
    const { InputProps } = props;
    return <Icon path={ mdiCloseOctagon } size={ 1 } />;
}
