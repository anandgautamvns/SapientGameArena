import { combineReducers } from 'redux';
import gameArena from './gameArena'

const rootReducer = combineReducers(
    {
        gameArenaState: gameArena
    }
);

export const rootReducerWrapper = (state, action) => {
    return rootReducer(state, action);
};