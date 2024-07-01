import dayjs, { Dayjs } from "dayjs";

export const _date = (date?: string) => {
  const day = dayjs(date);
  const local = day.format("DD/MM/YYYY");
  const format = day.format();
  const today = dayjs().format();
  return { local, format, today, day };
};

export const _djs = (date?: string | dayjs.Dayjs | null) =>
  dayjs(date).format();

export const _formated_date = (date?: string | dayjs.Dayjs | null) =>
  dayjs(date).format("DD_MM_YYYY");

export enum DayOfWeek {
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье",
}

export enum Month {
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
}

export const _dbDateParser = (date: string) => {
  const obj = dayjs(date, "DD_MM_YYYY", "ru");
  const dd_mm_yyyy = obj.format("DD.MM.YYYY");
  const dd_mmmm = obj.format("DD MMMM");
  return { dd_mm_yyyy, dd_mmmm, _dayjs: obj };
};

export const stringifyMonth = (newValue: number) =>
  newValue < 10 ? "0" + (newValue + 1) : `${newValue + 1}`;
export function getMonthNumberFromDate(date_formated: string) {
  const month = Month[dayjs(date_formated, "DD_MM_YYYY", "ru").month()];
  const [d, m, y] = date_formated.split("_").map(Number);
  const day = DayOfWeek[dayjs(date_formated, "DD_MM_YYYY", "ru").day()];
  return { month, day, d, m, y };
}

type ReducedMonth = Partial<Record<keyof typeof Month & string, number>>;
export function monthReducer(events?: { date_formated: string }[]) {
  if (!events) return;
  const res = events.reduce((acc, event) => {
    const month = getMonthNumberFromDate(event.date_formated).month;
    const key = month as keyof ReducedMonth;
    if (!acc[key]) acc[key] = 1;
    else acc[key] = acc[key] + 1;

    return acc;
  }, {} as ReducedMonth);
  return { ...res };
}
