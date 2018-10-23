import { BTC_USD_RATE } from '../storeType';
import { triggerToaster } from '../actionCreators';

export function btcUsdRate(){
    return dispatch => {
        return fetch('https://coinlib.io/api/v1/coin?key=d437271814700b9a&pref=USD&symbol=SAFE', {
            method: 'GET',
        })
        .catch((error) => {
            console.log(error);
            dispatch(
                triggerToaster(
                  'btcUsdRate',
                  'Error',
                  'error'
                )
              );
        })
        .then(response => response.json())
        .then(json => {
            let _rate = json.data.price;
            dispatch(btcUsdRateState(_rate));
        })
    }
}

function btcUsdRateState(rate) {
    return {
      type: BTC_USD_RATE,
      btcUsdRate: rate,
    }
  }
