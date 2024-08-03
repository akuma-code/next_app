import dayjs from "dayjs";




export const _formated_date = (date?: string | dayjs.Dayjs | null) =>
  dayjs(date).format("YYYY-MM-DD");

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
  const obj = dayjs(date, "YYYY-MM-DD", "ru");
  const dd_mm_yyyy = obj.format("DD.MM.YYYY");
  const dd_mmmm = obj.format("DD MMMM");
  return { dd_mm_yyyy, dd_mmmm, _dayjs: obj };
};

export const stringifyMonth = (newValue: number) =>
  newValue < 10 ? "0" + (newValue + 1) : `${newValue + 1}`;
export function getMonthNumberFromDate(date_formated: string) {
  const month = Month[dayjs(date_formated, "YYYY-MM-DD", "ru").month()];
  const [y, m, d] = date_formated.split("-").map(Number);
  const day = DayOfWeek[dayjs(date_formated, "YYYY-MM-DD", "ru").day()];
  return { month, day, d, m, y };
}

type ReducedMonth = Partial<Record<keyof typeof Month & string, number>>

export const _date = (date: string) => {

  const [y, m, d] = date.split("-").map(Number);
  const djs = dayjs(date, "YYYY-MM-DD", "ru")
  const d_month = djs.month()
  const month_name = Month[d_month]
  const day_name = DayOfWeek[djs.day() - 1]
  return {
    encoded: { d, m } as const,
    year: y,
    month: d_month,
    month_name: month_name,
    day: djs.date(),
    day_name,
  }
};

export const handleEventOfPlayer = (event: { id: number, date_formated: string }) => {
  const { year, month, month_name } = _date(event.date_formated)
  return { year, month, month_name }
}

