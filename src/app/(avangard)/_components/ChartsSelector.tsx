import { MonthChart } from "@/Components/Charts/MonthCounter/MonthEventChart";
import { Board } from "./Board";
import React from "react";

function ChartsSelector(params: { view: string; }) {

    const view = params.view;
    if (view === 'players') return <Board />;
    if (view === 'events') return <MonthChart />;
    return <Board />;

}

export default React.memo(ChartsSelector)
