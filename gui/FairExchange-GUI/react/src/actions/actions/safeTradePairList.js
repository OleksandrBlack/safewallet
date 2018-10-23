import { SAFE_TRADE_PAIR_LIST } from '../storeType';
import { triggerToaster } from '../actionCreators';

export function safeTradePairList(){
    return dispatch => {
        return fetch('https://safe.trade/api/v2/markets', {
            method: 'GET',
        })
        .catch((error) => {
            console.log(error);
            dispatch(
                triggerToaster(
                'safeTradePairList',
                'Error',
                'error'
              )
            );
        })
        .then(response => response.json())
        .then(json => {                       
            dispatch(safeTradePairListState(json));
        });
    }
}

function safeTradePairListState(pairs){
    return {
        type: SAFE_TRADE_PAIR_LIST,
        pairs: pairs,
    }
}