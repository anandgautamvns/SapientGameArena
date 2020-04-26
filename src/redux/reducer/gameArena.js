import { GET_GAME_ARENA } from '../action/type';

const defaultWhatsNewState = {
    gameArena: null,
    gameArenaStatus: null
};

export default function(state = defaultWhatsNewState, action){
    switch (action.type) {
        case GET_GAME_ARENA:
            return {
                ...state,
                gameArena: action.payload,
                gameArenaStatus: action.status,
            };

        default:
            return state;
    }
}