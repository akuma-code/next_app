import { Month, _date } from "./dateFuncs";
type MonthName = keyof typeof Month
type ReduceResult = {
    year: number;
    months: Record<MonthName, number>;
};
export function monthReducer(events?: { date_formated: string; }[]): ReduceResult | null {
    if (!events) return null;
    const res = events.reduce((acc, event) => {
        const { month_name, year } = _date(event.date_formated);

        const key = month_name as keyof typeof Month;
        const current = acc.months[key];
        if (current) {
            const months = { ...acc.months, [key]: current + 1 };
            acc = { ...acc, year, months };
        } else acc = { ...acc, year, months: { ...acc.months, [key]: 1 } };


        return acc;
    }, { months: {} } as ReduceResult);



    return res;
}
