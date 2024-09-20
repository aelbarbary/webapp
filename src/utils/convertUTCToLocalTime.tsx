import moment from 'moment'

export const convertUTCToLocalTime = (utcTime: string): string => {
    if (utcTime) {
        return moment.utc(utcTime, 'HH:mm:ss').local().format('HH:mm:ss')
    }
    return ''
}

export const convertLocalToUTCTime = (utcTime: string): string => {
    if (utcTime) {
        return moment(utcTime, 'HH:mm:ss').utc().format('HH:mm:ss')
    }
    return ''
}


