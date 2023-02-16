import {DayOfWeek, Month} from '../types/calendar';

export const MONTHS: Array<Month> = [
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
  'December',
];

export const WEEK_DAYS: Array<DayOfWeek> = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
];

/**
 * Get first date of the month
 * @param date Month date
 * @returns First date of the month
 */
export const getMonthFirstDate = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), 1);

/**
 * Get last date of the month
 * @param date Month date
 * @returns Last date of the month
 */
export const getMonthLastDate = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0);

/**
 * Get all dates for specific month (used in displaying calendar)
 * @param startDate Start date of the month
 * @param endDate End date of the month
 * @returns Array of dates starting from startDate to endDate
 */
export const getMonthDates = (startDate: Date, endDate: Date): Array<Date> => {
  let dates: Array<Date> = [];

  let start = startDate.getDate();
  const end = endDate.getDate();

  while (start <= end) {
    dates.push(new Date(startDate.getFullYear(), startDate.getMonth(), start));
    start += 1;
  }

  return dates;
};

/**
 * Add month on provided date
 * @param date Date to add number of months
 * @param n Number of months to be added
 * @returns New date
 */
export const addMonth = (date: Date, n: number): Date =>
  new Date(date.getFullYear(), date.getMonth() + n, date.getDate());

/**
 * Check equality of two dates based on year month and date
 * @param d1 First date
 * @param d2 Second date
 * @returns If two dates are equal
 */
export const isDateEqual = (d1: Date, d2: Date) =>
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate();

/**
 * @returns Current school year
 */
export const getCurrentSchoolYear = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  return `${year}-${year + 1}`;
};
