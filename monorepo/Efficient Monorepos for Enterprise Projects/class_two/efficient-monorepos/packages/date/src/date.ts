import { format, parseISO, isValid, addDays, subDays } from 'date-fns';

export const formatDate = (date: Date | string, formatStr: string = 'yyyy-MM-dd'): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return isValid(dateObj) ? format(dateObj, formatStr) : '';
};

export const addDaysToDate = (date: Date | string, days: number): Date => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return addDays(dateObj, days);
};

export const subtractDaysFromDate = (date: Date | string, days: number): Date => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return subDays(dateObj, days);
};

export const isValidDate = (date: any): boolean => {
  if (typeof date === 'string') {
    return isValid(parseISO(date));
  }
  return isValid(date);
};

export const isValidDate2 = (date: any): boolean => {
  if (typeof date === 'string') {
    return isValid(parseISO(date));
  }
  return isValid(date);
};