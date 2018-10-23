import {
    SAFE_VOTE,
} from '../actions/storeType';

export function SafeVote(state = {
  hasRound: null,
  round: null,
  items: null,
}, action) {
    switch (action.type){
        case SAFE_VOTE:
            return {
                ...state,
                hasRound: action.hasRound,
                round: action.round,
                items: action.items,
            };
        default:
            return state;
    }
}

export default SafeVote;