import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import bookingReducer from './booking';
import taskReducer from './task';
import reviewsReducer from './review'
import taskersReducer from './taskers';
import billingsReducer from './billing'
import messagesReducer from './messages'


const rootReducer = combineReducers({
  session,
  booking: bookingReducer,
  task: taskReducer,
  review: reviewsReducer,
  tasker: taskersReducer,
  billing: billingsReducer,
  messages: messagesReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
