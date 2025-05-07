import dayjs from 'dayjs';

export const dateFormat = (date: String) => {
    const day = ['日', '月', '火', '水', '木', '金', '土']

    const thisYear = dayjs(String(new Date)).format('YYYY');
    const recordYear = dayjs(String(date)).format('YYYY');
    const recordDay = `（${day[Number(dayjs(String(date)).format('d'))]}）`

    const recodeDate = dayjs(String(date)).format('YYYY/M/DD')
    const thisToday = dayjs(String(new Date())).format('YYYY/M/DD')
    const thisYesterday = dayjs(String(new Date(new Date().setDate(new Date().getDate() - 1)))).format('YYYY/M/DD')
    const thisTomorrowday = dayjs(String(new Date(new Date().setDate(new Date().getDate() + 1)))).format('YYYY/M/DD')

    if (thisYesterday == recodeDate) return "昨日 " + recordDay
    if (thisToday == recodeDate) return "今日 " + recordDay
    if (thisTomorrowday == recodeDate) return "明日 " + recordDay

    if (thisYear == recordYear) {
        return dayjs(String(date)).format('M/D') + recordDay;
    }
    else {
        return dayjs(String(date)).format('YYYY/M/D') + recordDay;
    }
}