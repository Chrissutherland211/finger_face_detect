import { combineReducers } from 'redux';
import CountReducer from './count.reducer';
import SingupReducer from './signup.reducer';

export default combineReducers({
    count: CountReducer,
    fingerdata:SingupReducer,
  });
