import moment from 'moment';

moment.locale('ru');

export const getFormatDate = date => moment(date).format('DD MMMM, YYYY');

export const setFormatDate = date => moment(date).format('YYYY-MM-DD');

export const SORT_OPTIONS = ['По умолчанию', 'По возрастанию', 'По убыванию'];

export const SortEnum = {
  SORT_BY_DISTANCE_UP: 'SORT_BY_DISTANCE_UP',
  SORT_BY_DISTANCE_DOWN: 'SORT_BY_DISTANCE_DOWN',
  SORT_BY_DATE_UP: 'SORT_BY_DATE_UP',
  SORT_BY_DATE_DOWN: 'SORT_BY_DATE_DOWN',
};

export const ActivitiesEnum = {
  RUN: 'Бег',
  CYCLE: 'Велосипед',
  SKI: 'Лыжи',
  WALKING: 'Ходьба',
};

export const getUniqueItems = data => data.filter((item, index, array) => array.indexOf(item) === index);
export const getUtcDate = date => moment(date).utc().format();
