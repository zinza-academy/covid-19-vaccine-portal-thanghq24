import dayjs from 'dayjs';

export const getISODate = (
  date: string | number | Date | dayjs.Dayjs | null | undefined
) => {
  return dayjs(date).format('YYYY-MM-DD');
};
