let electrumServers = {
  safecoin: { // !estimatefee
    address: 'local.support',
    port: 10001,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'SAFE',
    serverList: [
      'local.support:10001',
      'electrum.safc.cc:10001'
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
    port: 10003,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'ANON',
    serverList: [
      'local.support:10003',
      'local.support:10003'
    ],
  },
  zcl: {
    address: 'local.support',
    port: 40001,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'ZCL',
    serverList: [
      'local.support:40001',
      'local.support:40001'
    ],
  },
};

module.exports = electrumServers;