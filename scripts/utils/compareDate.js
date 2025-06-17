import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export function compareDate(date) {
    if(date.isBefore(dayjs())) return "delivered:"
    return "Arriving on:"
}