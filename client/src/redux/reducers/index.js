import { combineReducers } from 'redux';

import podcastReducer from './podcastReducer';
import authorReducer from './authorReducer';
import apiCallsInProgress from './apiStatusReducer';

const rootReducer = combineReducers({
  podcasts: podcastReducer,
  authors: authorReducer,
  apiCallsInProgress: apiCallsInProgress,
});

export default rootReducer;
