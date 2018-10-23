import { SAFE_TRADE_TICKERS } from '../storeType';
import { triggerToaster } from '../actionCreators';

export function safeTradeTickerList(){
    return dispatch => {
        return fetch('https://safe.trade/api/v2/tickers/', {
            method: 'GET',
        })
        .catch((error) => {
            console.log(error);        
        })
        .then(response => response.json())
        .then(json => {                
            dispatch(safeTradeTickerState(json));
        });
    }
}

function safeTradeTickerState(tickers){
    return {
        type: SAFE_TRADE_TICKERS,
        tickers: tickers, 
    }
}