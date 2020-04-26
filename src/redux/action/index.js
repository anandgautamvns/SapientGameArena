import Axios from 'axios';
import { LOADING, SUCCESS, ERROR } from '../../constants';

import { GET_GAME_ARENA } from './type'

export function getGameArena() {
    return async (dispatch) => {
        dispatch({ type: GET_GAME_ARENA, status: LOADING });
        try {
            let response;
            response = await Axios.get('http://starlord.hackerearth.com/gamesext');
            dispatch({ type: GET_GAME_ARENA, status: SUCCESS, payload: response.data });
        }
        catch (error) {
            if (!error.response) {
                dispatch({ type: GET_GAME_ARENA, status: ERROR });
            }
            else if (error.response.status) {
                dispatch({ type: GET_GAME_ARENA, status: ERROR });
            }
        }
    }
}