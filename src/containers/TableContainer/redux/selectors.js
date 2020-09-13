import moment from 'moment';
import { createSelector } from 'reselect';
import { SortEnum, getUniqueItems } from './../utils/utils';

export const getActivitiesList = state => state.table.activitiesList;

export const getCurrentActivityType = state => state.table.currentActivity;

export const getCurrentSortedBy = state => state.table.currentSortedBy;

export const getFormLoading = state => state.table.formLoading;

export const getFormError = state => state.table.formError;

export const getFetchError = state => state.table.fetchError;

export const getIsFetching = state => state.table.isFetching;

export const getFetchDeleteError = state => state.table.fetchDeleteError;

export const getActivitiesListByType = createSelector(
  getActivitiesList,
  getCurrentActivityType,
  (resultOne, resultTwo) => resultOne.filter((item) => {
    if (!resultTwo) {
      return true;
    }
    return item.type === resultTwo;
  }),
);

export const getActivitiesListBySort = createSelector(
  getActivitiesListByType,
  getCurrentSortedBy,
  (resultOne, resultTwo) => {
    if (!resultTwo) {
      return resultOne;
    }

    return resultOne.slice().sort((a, b) => {
      if (resultTwo === SortEnum.SORT_BY_DISTANCE_UP) {
        return a.distance - b.distance;
      }
      if (resultTwo === SortEnum.SORT_BY_DISTANCE_DOWN) {
        return b.distance - a.distance;
      }
      if (resultTwo === SortEnum.SORT_BY_DATE_UP) {
        return moment(b.date).isBefore(a.date) ? 1 : -1;
      }
      if (resultTwo === SortEnum.SORT_BY_DATE_DOWN) {
        return moment(a.date).isBefore(b.date) ? 1 : -1;
      }
      return 0;
    });
  },
);

export const getUniqueTypeActivities = createSelector(
  getActivitiesList,
  (resultOne) => {
    const typeActivitiesArray = resultOne.map(item => item.type);

    return getUniqueItems(['Все активности', ...typeActivitiesArray]);
  },
);
