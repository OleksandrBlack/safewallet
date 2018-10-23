import { ACTIVE_HANDLE } from '../storeType';
import { translate } from '../../translate/translate';
import Config from '../../config';
import {
  triggerToaster,
  toggleAddcoinModal,
  getDexCoins,
  shepherdElectrumCoins,
} from '../actionCreators';
import {
  startCurrencyAssetChain,
  startAssetChain,
  startCrypto,
  checkAC,
} from '../../components/addcoin/payload';

function iguanaActiveHandleState(json) {
  return {
    type: ACTIVE_HANDLE,
    isLoggedIn: json.status === 'unlocked' ? true : false,
    handle: json,
  }
}

export function activeHandle() {
  return dispatch => {
    return fetch(`http://127.0.0.1:${Config.safewalletPort}/shepherd/auth/status?token=${Config.token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'activeHandle',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      dispatch(
        iguanaActiveHandleState(json)
      );
    });
  }
}

export function shepherdElectrumAuth(seed) {
  return dispatch => {
    return fetch(`http://127.0.0.1:${Config.safewalletPort}/shepherd/electrum/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        seed,
        iguana: true,
        token: Config.token,
      }),
    })
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'shepherdElectrumAuth',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      if (json.msg !== 'error') {
        dispatch(activeHandle());
        dispatch(shepherdElectrumCoins());
      } else {
        dispatch(
          triggerToaster(
            translate('TOASTR.INCORRECT_WIF'),
            'Error',
            'error'
          )
        );
      }
    });
  }
}

export function shepherdElectrumAddCoin(coin) {
  return dispatch => {
    return fetch(`http://127.0.0.1:${Config.safewalletPort}/shepherd/electrum/coins/add?coin=${coin}&token=${Config.token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'shepherdElectrumAddCoin',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      dispatch(
        addCoinResult(coin, '0')
      );
    });
  }
}

export function addCoin(coin, mode, startupParams) {
  if (mode === 0 ||
      mode === '0') {
    return dispatch => {
      dispatch(shepherdElectrumAddCoin(coin));
    }
  } else {
    return dispatch => {
      dispatch(shepherdGetConfig(coin, '-1', startupParams));
    }
  }
}

function handleErrors(response) {
  let _parsedResponse;

  if (!response.ok) {
    return null;
  } else {
    _parsedResponse = response.text().then((text) => { return text; });
    return _parsedResponse;
  }
}

export function shepherdHerd(coin, mode, path, startupParams) {
  let acData;
  let herdData = {
    'ac_name': coin,
    'ac_options': [
      '-daemon=0',
      '-server',
      `-ac_name=${coin}`,
      '-addnode=78.47.196.146',
    ],
  };

  if (coin === 'BEER' ||
      coin === 'PIZZA') {
    herdData['ac_options'].pop();
    herdData['ac_options'].push('-addnode=24.54.206.138');
  } else if (coin === 'NINJA') {
    herdData['ac_options'].pop();
    herdData['ac_options'].push('-addnode=192.241.134.19');
  }

  if (coin === 'ZEC') {
    herdData = {
      'ac_name': 'zcashd',
      'ac_options': [
        '-daemon=0',
        '-server=1',
      ],
    };
  }

  if (coin === 'SAFE') {
    herdData = {
      'ac_name': 'safecoind',
      'ac_options': [
        '-daemon=0',
        '-addnode=78.47.196.146',
      ],
    };
  }

  if (startupParams) {
    herdData['ac_custom_param'] = startupParams.type;

    if (startupParams.value) {
      herdData['ac_custom_param_value'] = startupParams.value;
    }
  }

  // TODO: switch statement
  if (coin === 'SAFE') {
    acData = startCrypto(
      path.result,
      coin,
      mode
    );
  } else {
    const supply = startAssetChain(
      path.result,
      coin,
      mode,
      true
    );
    acData = startAssetChain(
      path.result,
      coin,
      mode
    );
    herdData.ac_options.push(`-ac_supply=${supply}`);
  }

  return dispatch => {
    let _herd;

    if (coin === 'CHIPS') {
      _herd = 'chipsd';
      herdData = {};
    } else {
      _herd = coin !== 'ZEC' ? 'safecoind' : 'zcashd';
    }

    return fetch(`http://127.0.0.1:${Config.safewalletPort}/shepherd/herd`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        herd: _herd,
        options: herdData,
        token: Config.token,
      }),
    })
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          translate('FAILED_SHEPHERD_HERD'),
          translate('TOASTR.SERVICE_NOTIFICATION'),
          'error'
        )
      );
    })
    .then(handleErrors)
    .then((json) => {
      if (json) {
        dispatch(
          addCoinResult(coin, mode)
        );
      } else {
        dispatch(
          triggerToaster(
            translate('TOASTR.ERROR_STARTING_DAEMON', coin) + ' ' + translate('TOASTR.PORT_IS_TAKEN', acData),
            translate('TOASTR.SERVICE_NOTIFICATION'),
            'error',
            false
          )
        );
      }
    });
  }
}

export function addCoinResult(coin, mode) {
  const modeToValue = {
    '0': 'spv',
    '-1': 'native',
  };

  return dispatch => {
    dispatch(
      triggerToaster(
        `${coin} ${translate('TOASTR.STARTED_IN')} ${modeToValue[mode].toUpperCase()} ${translate('TOASTR.MODE')}`,
        translate('TOASTR.COIN_NOTIFICATION'),
        'success'
      )
    );
    dispatch(toggleAddcoinModal(false, false));

    if (Number(mode) === 0) {
      dispatch(activeHandle());
      dispatch(shepherdElectrumCoins());
      dispatch(getDexCoins());

      setTimeout(() => {
        dispatch(activeHandle());
        dispatch(shepherdElectrumCoins());
        dispatch(getDexCoins());
      }, 500);
      setTimeout(() => {
        dispatch(activeHandle());
        dispatch(shepherdElectrumCoins());
        dispatch(getDexCoins());
      }, 1000);
      setTimeout(() => {
        dispatch(activeHandle());
        dispatch(shepherdElectrumCoins());
        dispatch(getDexCoins());
      }, 2000);
    } else {
      dispatch(activeHandle());
      dispatch(getDexCoins());

      setTimeout(() => {
        dispatch(activeHandle());
        dispatch(getDexCoins());
      }, 500);
      setTimeout(() => {
        dispatch(activeHandle());
        dispatch(getDexCoins());
      }, 1000);
      setTimeout(() => {
        dispatch(activeHandle());
        dispatch(getDexCoins());
      }, 5000);
    }
  }
}

export function _shepherdGetConfig(coin, mode, startupParams) {
  return dispatch => {
    return fetch(`http://127.0.0.1:${Config.safewalletPort}/shepherd/getconf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chain: 'safecoind',
        token: Config.token,
      }),
    })
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          '_shepherdGetConfig',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(
      json => dispatch(
        shepherdHerd(
          coin,
          mode,
          json,
          startupParams
        )
      )
    );
  }
}

export function shepherdGetConfig(coin, mode, startupParams) {
  if (coin === 'SAFE' &&
      mode === '-1') {
    return dispatch => {
      return fetch(`http://127.0.0.1:${Config.safewalletPort}/shepherd/getconf`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chain: 'safecoind',
          token: Config.token,
        }),
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          triggerToaster(
            'shepherdGetConfig',
            'Error',
            'error'
          )
        );
      })
      .then(response => response.json())
      .then(
        json => dispatch(
          shepherdHerd(
            coin,
            mode,
            json,
            startupParams
          )
        )
      );
    }
  } else {
    return dispatch => {
      return fetch(`http://127.0.0.1:${Config.safewalletPort}/shepherd/getconf`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chain: coin,
          token: Config.token,
        }),
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          triggerToaster(
            'shepherdGetConfig',
            'Error',
            'error'
          )
        );
      })
      .then(response => response.json())
      .then(
        json => dispatch(
          shepherdHerd(
            coin,
            mode,
            json,
            startupParams
          )
        )
      );
    }
  }
}