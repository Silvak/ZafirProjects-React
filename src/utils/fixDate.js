import moment from 'moment';

export const fixDate = (dateStart, dateEnd) => {
  const fixStart = moment(dateStart).format('DD/MM/YYYY'),
    fixEnd = moment(dateEnd).format('DD/MM/YYYY');

  return { fixStart, fixEnd };
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
