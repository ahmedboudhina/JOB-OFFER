import { combineReducers } from 'redux';
import error from './errorReducer';
import auth from './authReducer';
import jobs from './jobsReducer'
import app from './appointmentsReducer'
export default combineReducers({
    auth,
    error,
    jobs,
    app,
})
