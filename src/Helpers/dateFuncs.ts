import dayjs from "dayjs"

export const _date = (date?: string) => {
    const day = dayjs(date)
    const local = day.format('DD/MM/YYYY')
    const format = day.format()
    const today = dayjs().format()
    return { local, format, today, day }


}

export const _djs = (date?: string) => dayjs(date).format()