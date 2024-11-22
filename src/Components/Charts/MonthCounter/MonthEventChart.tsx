"use client";

import { Paper } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getMonthEventPlayers } from "./db";

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
    // console.log(data);

    return (
        <Paper elevation={ 4 }>
            <BarChart
                loading={ isLoading }
                height={ 550 }
                width={ 500 }
                dataset={ data }
                margin={ { bottom: 80 } }
                series={ [
                    {
                        dataKey: "total",
                        id: "p_ids",
                    },
                ] }
                xAxis={ [
                    {
                        dataKey: "month",
                        scaleType: "band",
                    },
                ] }
                yAxis={ [
                    {
                        colorMap: {
                            type: "continuous",
                            color: ["#62a37b", "#f33a3a"],
                            min: 30,
                            max: 150,
                        },
                    },
                ] }
                bottomAxis={ {
                    tickLabelStyle: {
                        angle: 45,
                        textAnchor: 'start',
                        // fontSize: 12,
                    },
                } }
                layout="vertical"

                barLabel={ 'value' }
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
