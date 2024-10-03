import { Month, _date } from "./dateFuncs";
type MonthName = keyof typeof Month
type ReduceResult = {
    year: number;
    months: Record<MonthName, number>;
    days: Record<MonthName, number[]>
};
export function monthReducer(events?: { date_formated: string; }[]): ReduceResult | null {
    if (!events) return null;
    const res = events.reduce((acc, event) => {
        const { month: month_name, year, encoded: { d } } = _date(event.date_formated);

        const key = month_name as keyof typeof Month;
        const current = acc.months[key];
        if (current) {
            const months = { ...acc.months, [key]: current + 1 };
            const days = { ...acc.days, [key]: [...acc.days[key], d] }
            acc = { ...acc, year, months, days };
        } else acc = { ...acc, year, months: { ...acc.months, [key]: 1 }, days: { ...acc.days, [key]: [d] } };


        return acc;
    }, { months: {}, days: {} } as ReduceResult);



    return res;
}
