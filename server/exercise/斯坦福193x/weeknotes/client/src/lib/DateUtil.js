/* @flow */

class DateUtil {

  static getMonthString(date) {
    if (!date instanceof Date)
      throw new Error('Invalid parameter');

    const MONTHS = [ 'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December']; 
    const monthIndex = date.getMonth();
    return MONTHS[monthIndex].substr(0, 3);
  }

  static getDayString(date) {
    if (!date instanceof Date)
      throw new Error('Invalid parameter');

    const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
      'Friday', 'Saturday'];
    const dayIndex = date.getDay();
    return DAYS[dayIndex].substr(0, 3);
  }

  static zeroPaddedDate(date) {
    return DateUtil._padNumber(date.getDate(), 2);
  }

  static zeroPaddedMonth(date) {
    return DateUtil._padNumber(date.getMonth() + 1, 2);
  }

  static _padNumber(n, size) {
    let s = n + '';
    while (s.length < size) {
      s = '0' + s;
    }
    return s;
  }
}

export default DateUtil;
