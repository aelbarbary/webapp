import moment from 'moment'

export function getLocalDateTime(date: any, time: any) {
    const utcDatetime = `${date}T${time}Z`

    // Create a new Date object with the UTC datetime
    const utcDate = new Date(utcDatetime)

    const localDate = new Date(
        utcDate.getTime() + utcDate.getTimezoneOffset() * 60000
    )

    const localDatetime = moment
        .utc(utcDate)
        .local()
        .format('YYYY-MM-DD HH:mm:ss (dddd)')

    return localDatetime
}
