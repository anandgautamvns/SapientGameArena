import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducerWrapper } from './reducer';

const initialState = {};

const middleware = [thunk];

const store = createStore(
    rootReducerWrapper,
    initialState,
    applyMiddleware(...middleware)
);

export default store;