import { handleActions } from 'redux-actions';
import {
  fetchRequest,
  fetchSuccess,
  fetchFailure,
  setCurrentActivity,
  setCurrentSortBy,
  addActivitiesList,
  setFormError,
  setFormLoading,
  setDeleteError,
} from './actions';

const defaultState = {
  activitiesList: [],
  currentActivity: null,
  isFetching: false,
  fetchError: false,
  currentSortedBy: null,
  formLoading: false,
  formError: false,
  fetchDeleteError: false,
};

export default handleActions(
  {
    [fetchRequest](state) {
      return {
        ...state,
        isFetching: true,
      };
    },
    [fetchSuccess](state) {
      return {
        ...state,
        isFetching: false,
        fetchError: false,
      };
    },
    [addActivitiesList](state, { payload }) {
      return {
        ...state,
        activitiesList: payload,
      };
    },
    [fetchFailure](state) {
      return {
        ...state,
        isFetching: false,
        fetchError: true,
      };
    },
    [setCurrentActivity](state, { payload }) {
      return {
        ...state,
        currentActivity: payload,
      };
    },
    [setCurrentSortBy](state, { payload }) {
      return {
        ...state,
        currentSortedBy: payload,
      };
    },
    [setFormLoading](state, { payload }) {
      return {
        ...state,
        formLoading: payload,
      };
    },
    [setFormError](state, { payload }) {
      return {
        ...state,
        formError: payload,
      };
    },
    [setDeleteError](state, { payload }) {
      return {
        ...state,
        fetchDeleteError: payload,
      };
    },
  },
  defaultState,
);
