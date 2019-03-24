let electrumServers = {
  safecoin: { // !estimatefee
    address: 'local.support',
    port: 10001,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'SAFE',
    serverList: [
      'dev.local.support:10001',
      'local.support:10001',
      'electrumnld.safecoin.org:10001'
    ],
  },
  btcz: {
    address: 'local.support',
    port: 10002,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'BTCZ',
    serverList: [
      'local.support:10002',
      'electrum.safc.cc:10002'
    ],
  },
  anon: {
    address: 'local.support',
    port: 20003,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'ANON',
    serverList: [
      'local.support:20003',
      '45.63.13.60:20003',
      'electrum.safc.cc:20003'
    ],
  },
  zcl: {
    address: 'local.support',
    port: 40001,
    proto: 'tcp',
    txfee: 1000,
    abbr: 'ZCL',
    serverList: [
      'local.support:40001',
      '45.63.13.60:40001',
    ],
  },
  xsg: {
    address: 'local.support',
    port: 50001,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'XSG',
    serverList: [
      'local.support:50001',
      '45.63.13.60:50001',
    ],
  },
};

module.exports = electrumServers;
