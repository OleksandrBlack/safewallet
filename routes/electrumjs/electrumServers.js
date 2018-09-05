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
    address: 'electrum.zclassic.org',
    port: 5222,
    proto: 'tcp',
    txfee: 10000,
    abbr: 'ZCL',
    serverList: [
      'electrum.zclassic.org:5222',
      'zcl-electrum.com:50002'
    ],
  },
};

module.exports = electrumServers;