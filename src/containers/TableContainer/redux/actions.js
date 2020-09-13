import { createAction } from 'redux-actions';
import Api from '../api';

const api = new Api();

export const fetchRequest = createAction('FETCH_REQUEST');
export const fetchSuccess = createAction('FETCH_SUCCESS');
export const fetchFailure = createAction('FETCH_FAILURE');
export const addActivitiesList = createAction('ADD_ACTIVITIES_LIST');

export const setCurrentActivity = createAction('SET_CURRENT_ACTIVITY');
export const setCurrentSortBy = createAction('SET_CURRENT_SORT_BY');
export const setFormLoading = createAction('SET_FORM_LOADING');
export const setFormError = createAction('SET_FORM_ERROR');
export const setDeleteError = createAction('SET_DELETE_ERROR');

export const fetchGetActivities = () => (dispatch) => {
  try {
    dispatch(fetchRequest());
    const activitiesList = api.getActivities();
    dispatch(fetchSuccess());
    dispatch(addActivitiesList(activitiesList));
  } catch (error) {
    dispatch(fetchFailure());
  }
};

export const fetchAddActivity = (data, success) => (dispatch) => {
  try {
    dispatch(setFormLoading(true));
    dispatch(setFormError(false));
    const activitiesList = api.addActivity(data);
    dispatch(addActivitiesList(activitiesList));
    dispatch(setFormLoading(false));
    success();
  } catch (error) {
    dispatch(setFormLoading(false));
    dispatch(setFormError(true));
  }
};

export const fetchDeleteActivity = id => (dispatch) => {
  try {
    dispatch(setDeleteError(false));
    const activitiesList = api.deleteActivity(id);
    dispatch(addActivitiesList(activitiesList));
  } catch (error) {
    dispatch(setDeleteError(true));
  }
};

export const editActivity = (id, data, success) => (dispatch) => {
  try {
    dispatch(setFormLoading(true));
    dispatch(setFormError(false));
    const activitiesList = api.editActivity(id, data);
    dispatch(addActivitiesList(activitiesList));
    dispatch(setFormLoading(false));
    success();
  } catch (error) {
    dispatch(setFormLoading(false));
    dispatch(setFormError(true));
  }
};
