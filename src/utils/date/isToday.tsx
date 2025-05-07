import dayjs from 'dayjs';

export const isToday = (date: String | Date) => {
    const recodeDate = dayjs(String(date)).format('YYYY/M/DD')
    const thisTomorrowday = dayjs(String(new Date)).format('YYYY/M/DD')

    if (recodeDate == thisTomorrowday) return true

    return false
}