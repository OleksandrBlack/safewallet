import { translate } from '../../translate/translate';
import mainWindow from '../../util/mainWindow';
import config from '../../config';

const addCoinOptionsCrypto = () => {
  const availableSAFEModes = mainWindow.arch === 'x64' ? 'spv|native' : 'spv';

  let _coins = [{
    label: 'Safecoin (SAFE)',
    icon: 'SAFE',
    value: `SAFE|${availableSAFEModes}`,
    },{
      label: 'BitcoinZ (BTCZ)',
      icon: 'BTCZ',
      value: `BTCZ|spv`,
    },{
      label: 'ANON (ANON)',
      icon: 'ANON',
      value: `ANON|spv`,
    },{
      label: 'ZClassic (ZCL)',
      icon: 'ZCL',
      value: `ZCL|spv`,
    }];

  if (config.experimentalFeatures) {
    _coins.push(/*{
      label: 'BitcoinZ (BTCZ)',
      icon: 'BTCZ',
      value: `BTCZ|spv`,
    }*/);
  }

  return _coins;
}

export default addCoinOptionsCrypto;