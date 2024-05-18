import dayjs, { Dayjs } from "dayjs"

export const _date = (date?: string) => {
    const day = dayjs(date)
    const local = day.format('DD/MM/YYYY')
    const format = day.format()
    const today = dayjs().format()
    return { local, format, today, day }


}

export const _djs = (date?: string | dayjs.Dayjs | null) => dayjs(date).format()

export const _formated_date = (date?: string | dayjs.Dayjs | null) => dayjs(date).format("DD_MM_YYYY")

export enum DayOfWeek {
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье',
}

export enum Month {
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
}