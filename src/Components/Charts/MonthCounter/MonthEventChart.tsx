"use client";

import { BarChart } from "@mui/x-charts";
import { getMonthEventPlayers } from "./db";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Paper } from "@mui/material";

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
    // console.log(groupByDate(data));

    return (
        <Paper>
            <BarChart
                loading={isLoading}
                height={800}
                width={500}
                dataset={data}
                series={[
                    {
                        dataKey: "total",
                        label: "Последние 20 тренировок",
                        id: "p_ids",
                        color: "#4a7bd6",
                    },
                ]}
                yAxis={[
                    {
                        dataKey: "date",
                        scaleType: "band",

                        // id: "p_id",
                    },
                ]}
                xAxis={[
                    {
                        colorMap: {
                            type: "continuous",
                            color: ["#aac498", "#cc2f2f"],
                            min: 3,
                            max: 20,
                        },
                    },
                ]}
                layout="horizontal"
                margin={{ left: 100 }}
                barLabel={"value"}
            />
        </Paper>
    );
};

async function getChartData() {
    const data = await getMonthEventPlayers();

    // console.log(groupByDate(data));
    return data;
}
function groupByDate_<
    T extends {
        id: number;
        date: string;
        total: number;
    },
>(arr: T[]) {
    const res = arr.reduce((sum, c) => {
        const [d, m] = c.date.split(" ");
        // if (!(m in sum)) sum[m] = [];
        Array.isArray(sum) && sum.push({ month: m, total: c.total });

        return sum;
    }, {} as any);

    return res;
}

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
            sum[y].push({ month: m, total: c._count.players });
            return sum;
        },
        {} as { [year: string]: { month: string; total: number }[] }
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
