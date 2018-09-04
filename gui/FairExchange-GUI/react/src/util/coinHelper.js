export function getCoinTitle(coin) {
  let coinlogo;
  let coinname;
  let transparentBG = false;
  let titleBG = false;
  let hideTitle = false;

  switch (coin) {
    case 'BTCZ':
      coinlogo = 'btcz';
      coinname = 'BitcoinZ';
      break;
    case 'SAFE':
      hideTitle = true;
      titleBG = true;
      transparentBG = true;
      coinlogo = 'safe';
      coinname = 'Safecoin';
      break;
    case 'ANON':
      coinlogo = 'anon';
      coinname = 'ANON';
      break;
  }

  return {
    logo: coinlogo,
    name: coinname,
    titleBG,
    transparentBG,
  };
}

export function getModeInfo(mode) {
  let modecode;
  let modetip;
  let modecolor;

  switch (mode) {
    case 'native':
      modecode = 'Native';
      modetip = 'Native';
      modecolor = 'primary';
      break;
    case 'spv':
      modecode = 'SPV';
      modetip = 'SPV';
      modecolor = 'info';
      break;
    case 'full':
      modecode = 'Full';
      modetip = 'Full';
      modecolor = 'success';
      break;
    case 'virtual':
      modecode = 'Virtual';
      modetip = 'Virtual';
      modecolor = 'danger';
      break;
    case 'notarychains':
      modecode = 'Notarychains';
      modetip = 'Notarychains';
      modecolor = 'dark';
      break;
  }

  return {
    code: modecode,
    tip: modetip,
    color: modecolor,
  };
}

export function coindList() {
  const _coins = [
    'SAFE'
  ];

  return _coins;
}

export const isSafecoinCoin = (coin) => {
  if (coin === 'SAFE') {
    return true;
  }
}