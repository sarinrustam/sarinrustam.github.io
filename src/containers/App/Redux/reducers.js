import { reducer as reduxFormReducer } from 'redux-form';
import modalReducer from '../../../shared/modal/redux/reducer';
import currentUserReducer from './currentUserReducer';
import tableReducer from '../../TableContainer/redux/reducer';

export default {
  form: reduxFormReducer,
  modal: modalReducer,
  currentUser: currentUserReducer,
  table: tableReducer,
};
