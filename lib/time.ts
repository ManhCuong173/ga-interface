import * as dayjs from 'dayjs'
export const formatTimeCreate = (timeStamp: number) => {

    return dayjs.unix(timeStamp).format('MMM DD,YYYY-HH:mm:ss');

}

export const formatTime = (timeStamp: number) => {
    return dayjs.unix(timeStamp).format('MM/DD/YYYY, HH:mm:ss');
}