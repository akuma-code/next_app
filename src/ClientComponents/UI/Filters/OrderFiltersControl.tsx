"use client";

import { useQuerySearch } from "@/Hooks/useQuerySearch";
import {
    mdiCard,
    mdiChartTimeline,
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
import dayjs from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

//TODO: textfield=>button
//TODO: handle filteration
//TODO: сделать promotion player->master
//TODO: сделать вывод количества ивентов в окошке выбора месяца

export interface FilterState {
    order: "asc" | "desc" | null;
    month: number;
    view: "card" | "table" | null;
}
export type UrlQueryVariant = {
    queryKey: 'order' | 'view'
    value: "asc" | "desc" | "card" | "table"
}
export function OrderFilterControls() {
    const [filters, setFilters] = useState<FilterState>({
        order: "desc",
        month: dayjs().month(),
        view: null
    });
    const router = useRouter();
    const pathname = usePathname();
    const qcreate = useQuerySearch();



    const handler = (key: 'order' | 'view') => (e: any, value: string | null) => {
        setFilters((prev) => ({ ...prev, [key]: value }));

        const search = qcreate(key, value)
        const path = value ? `${pathname}?${search}` : pathname;

        router.replace(path);

    }
    const handlerMemo = useCallback(handler, [pathname, qcreate, router])
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
                sx={ {
                    [`& .Mui-selected`]: {
                        bgcolor: "primary.light",
                        color: "primary.contrastText",
                    },
                } }
            >
                <ToggleButtonGroup
                    orientation={ "horizontal" }
                    exclusive
                    value={ filters.order }
                    onChange={ handlerMemo('order') }
                    size="small"

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
                        type="button"
                    >
                        <Icon
                            path={ mdiSortBoolAscending }
                            size={ 1 }
                        />
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
                        type="button"
                    >
                        <Icon
                            path={ mdiSortBoolDescending }
                            size={ 1 }
                        />

                    </ToggleButton>
                </ToggleButtonGroup>
                <ToggleButtonGroup
                    orientation={ "horizontal" }
                    exclusive
                    value={ filters.view }
                    onChange={ handlerMemo('view') }
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
