const addDateSuffix = date => {
    let dateStr = date.toString();
  
    // get last char of date string
    const lastChar = dateStr.charAt(dateStr.length - 1);
  
    if (lastChar === '1' && dateStr !== '11') {
      dateStr = `${dateStr}st`;
    } else if (lastChar === '2' && dateStr !== '12') {
      dateStr = `${dateStr}nd`;
    } else if (lastChar === '3' && dateStr !== '13') {
      dateStr = `${dateStr}rd`;
    } else {
      dateStr = `${dateStr}th`;
    }
  
    return dateStr;
  };
  
  module.exports = (
    timestamp,
    { monthLength = 'short', dateSuffix = true } = {}
  ) => {
    let months;
  
    if (monthLength === 'short') {
      months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ];
    } else {
      months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ];
    }
  
    const dateObj = new Date(timestamp);
    const formattedMonth = months[dateObj.getMonth()];
  
    let dayOfMonth;
  
    if (dateSuffix) {
      dayOfMonth = addDateSuffix(dateObj.getDate());
    } else {
      dayOfMonth = dateObj.getDate();
    }
  
    const year = dateObj.getFullYear();
  
    let hour;
    // check for 24-hr time
    if (dateObj.getHours() > 12) {
      hour = Math.floor(dateObj.getHours() / 2);
    } else {
      hour = dateObj.getHours();
    }
    // if hour is 0 (12:00am), change it to 12
    if (hour === 0) {
      hour = 12;
    }
  
    const minutes = dateObj.getMinutes();
  
    // set `am` or `pm`
    let periodOfDay;
  
    if (dateObj.getHours() >= 12) {
      periodOfDay = 'pm';
    } else {
      periodOfDay = 'am';
    }
  
    const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;
  
    return formattedTimeStamp;
  };
  