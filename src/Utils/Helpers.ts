import { differenceInDays, subDays, subMonths, subYears, differenceInHours, differenceInMinutes, differenceInMonths, differenceInYears, format } from 'date-fns';

export function getDateRange(value: 'Today' | 'Last Week' | 'Last Month' | 'Last Year') {
  const today = new Date();
  let fromDate = today;

  switch (value) {
    case 'Today':
      fromDate = today;
      break;
    case 'Last Week':
      fromDate = subDays(today, 7);
      break;
    case 'Last Month':
      fromDate = subMonths(today, 1);
      break;
    case 'Last Year':
      fromDate = subYears(today, 1);
      break;
    default:
      fromDate = today;
  }

  // Format as YYYY-MM-DD for backend
  return {
    fromDate: format(fromDate, 'yyyy-MM-dd'),
    toDate: format(today, 'yyyy-MM-dd'),
  };
}

/**
 *
 * @param type type of range (daily, weekly, monthly, yearly)
 * @returns fromDate and toDate
 */
export function getDailyToYearlyDateRange(type: 'Daily' | 'Weekly' | 'Monthly' | 'Yearly', withSameMonthAndYear = false) {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  let fromDate = today;

  switch (type) {
    case 'Daily':
      fromDate = today;
      break;
    case 'Weekly':
      fromDate = subDays(today, 7);
      break;
    case 'Monthly':
      fromDate = `${year}-01-01` as any;
      break;
    case 'Yearly':
      fromDate = `${year}-01-01` as any;
      break;
    default:
      fromDate = today;
  }

  return {
    fromDate: type == 'Yearly' && !withSameMonthAndYear ? null : format(fromDate, 'yyyy-MM-dd'),
    toDate: type == 'Yearly' && !withSameMonthAndYear ? null : format(today, 'yyyy-MM-dd'),
  };
}

export function truncateText(text: string, maxLength = 100) {
  if (!text) return '';
  if (text?.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
}

export const truncateWords = (text: string, wordLimit: number = 3): string => {
  const words = text.split(' ');
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(' ') + '...';
};

export function capitalizeFirstLetter(string: string) {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

/**
 *
 * @param timestamp timestamp
 * @returns returns formatted time
 */

export function formatTimeAgo(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();

  const years = differenceInYears(now, date);
  if (years > 0) return years >= 1 && years < 5 ? `${years} yr` : format(date, 'd/M');

  const months = differenceInMonths(now, date);
  if (months > 0) return `${months} mon`;

  const days = differenceInDays(now, date);
  if (days > 0) return `${days} d`;

  const hours = differenceInHours(now, date);
  if (hours > 0) return `${hours} hr`;

  const minutes = differenceInMinutes(now, date);
  if (minutes > 0) return `${minutes} min`;

  return 'just now';
}
