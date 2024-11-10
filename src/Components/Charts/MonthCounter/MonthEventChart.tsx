"use client";

import { BarChart } from "@mui/x-charts";
import { getMonthEventPlayers } from "./db";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Paper } from "@mui/material";
import { group } from "@/Helpers/groups";

export const MonthChart = () => {
    const {
        data = [],
        error,
        isLoading,
    } = useQuery({
        queryKey: ["players_count_by_events"],
        queryFn: getChartData,
        placeholderData: keepPreviousData,

    });
    console.log(data);

    return (
        <Paper>
            <BarChart
                loading={ isLoading }
                height={ 500 }
                width={ 550 }
                dataset={ data }
                series={ [
                    {
                        dataKey: "total",
                        // label: "2024 год",
                        id: "p_ids",
                        // color: "#4a7bd6",
                    },
                ] }
                xAxis={ [
                    {
                        dataKey: "month",
                        scaleType: "band",

                        // id: "p_id",
                    },
                ] }
                yAxis={ [
                    {
                        colorMap: {
                            type: "continuous",
                            color: ["#6289a3", "#0e085f"],
                            min: 30,
                            max: 150,
                        },
                    },
                ] }
                layout="vertical"
                // topAxis={ { label: 'value' } }
                // margin={  }
                // barLabel={ ((item, context) => `всего: ${item.value} `) }
                barLabel={ 'value' }
            // slotProps={ { barLabel: { color: 'red' }, axisLabel: { color: 'red' } } }
            />
        </Paper>
    );
};

async function getChartData() {
    const data = await getMonthEventPlayers();

    // console.log(groupByDate(data));
    return data;
}
// function groupByDate_<
//     T extends {
//         id: number;
//         date: string;
//         total: number;
//     },
// >(arr: T[]) {
//     const res = arr.reduce(
//         (sum, c) => {
//             const [d, m] = c.date.split(" ");
//             // if (!(m in sum)) sum[m] = [];
//             Array.isArray(sum) && sum.push({ month: m, total: c.total });

//             return sum;
//         },
//         {} as Record<string, { month: string; total: number }[]>
//     );

//     return res;
// }

function groupByDate<
    T extends {
        id: number;
        date_formated: string;
        _count: {
            players: number;
        };
    },
>(arr: T[]) {
    const res = arr.reduce(
        (sum, c) => {
            const [y, m, d] = c.date_formated.split("-");
            if (sum[y]) sum[y].push({ month: m, total: c._count.players });
            else sum[y] = [];
            return sum;
        },
        {} as Record<string, { month: string; total: number }[]>
    );

    return res;
}
// function groupByMonth(
//     data: {
//         date: string;
//         total: number;
//         id: number;
//     }[]
// ) {
//     const getM = (date: string) => date.split(" ")[1];
//     const grouped = data.reduce((prev, current) => {
//         const m = getM(current.date);
//     }, []);
// }
