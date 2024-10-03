import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
dayjs.extend(weekday)


export const _formated_date = (date?: string | dayjs.Dayjs | null) =>
  dayjs(date, "YYYY-MM-DD", 'ru').format("YYYY-MM-DD");

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
  const dd_mmmm = dayjs(date, "YYYY-MM-DD", "ru").format("DD MMMM");
  return { dd_mm_yyyy, dd_mmmm, _dayjs: obj };
};

export const stringifyMonth = (newValue: number) =>
  newValue <= 9 ? "0" + (newValue + 1) : `${newValue + 1}`;
export function getMonthNumberFromDate(date_formated: string) {
  const month = Month[dayjs(date_formated, "YYYY-MM-DD", "ru").month()];
  const [y, m, d] = date_formated.split("-").map(Number);
  const day = DayOfWeek[dayjs(date_formated, "YYYY-MM-DD", "ru").day()];
  return { month, day, d, m, y };
}


type DateKeys = keyof ReturnType<typeof _date>

export function _date(date: string) {

  const [y, m, d] = date.split("-").map(Number);
  const djs = dayjs(date, "YYYY-MM-DD", "ru")
  const d_month = djs.month()
  const month_name = Month[d_month]
  const day_name = DayOfWeek[djs.day() - 1]



  const result = {
    yyyy: y,
    mm: d_month,
    dd: djs.date(),
    month: month_name,
    day_name,
  }


  return result
};

export const _dateKey = (date: string, key: DateKeys) => _date(date)[key]
