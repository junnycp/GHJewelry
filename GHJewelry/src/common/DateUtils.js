export function compareDate(date1, date2, dateFormat) {
    var startDate = moment(date1, dateFormat);//Date format
    var endDate = moment(date2, dateFormat);
    return startDate > endDate;
}

export function compareTime(time1, time2, timeFormat) {
    var startTime = moment(time1, timeFormat);//Date format
    var endTime = moment(time2, timeFormat);
    return startTime >= endTime;
}
