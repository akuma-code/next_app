`use client`;
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import React from "react";

export const TicketGauge = ({
    amount,
    limit,
}: {
    amount: number | null;
    limit: number;
}) => {
    if (!amount || !limit) return null;
    return (
        <Gauge
            width={100}
            height={200}
            value={5}
            valueMax={10}
            startAngle={0}
            endAngle={0}
            text={({ value, valueMax }) => `${value} / ${valueMax}`}
            sx={{
                [`& .${gaugeClasses.valueText}`]: {
                    fontSize: 12,
                    // transform: "translate(0px, 0px)",
                },
            }}
        />
    );
};
const el = React.memo(TicketGauge);
