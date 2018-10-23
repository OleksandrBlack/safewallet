import {
    SAFE_TRADE_PAIR_LIST,
    SAFE_TRADE_CHANGE_ACTIVE_PAIR,
    SAFE_TRADE_TICKERS
} from '../actions/storeType';

export function SafeTrade(state = {
  pairs: null,
  activePair: null,
  tickers: null    
}, action) {
    switch (action.type){
        case SAFE_TRADE_PAIR_LIST:
            return {
                ...state,
                pairs: action.pairs,
            };
        case SAFE_TRADE_CHANGE_ACTIVE_PAIR:
            return {
                ...state,
                activePair: action.pair,
            };
        case SAFE_TRADE_TICKERS:
            return {
                ...state,
                tickers: action.tickers,
            }
        default:
            return state;
    }
}

export default SafeTrade;