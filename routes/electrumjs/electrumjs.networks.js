'use strict'
const bitcoin = require('bitcoinjs-lib');
let networks = exports;
Object.keys(bitcoin.networks).forEach((key) => {
  networks[key] = bitcoin.networks[key];
});


const {
  zec,
  safecoin,
  safe,
} = require('bitgo-utxo-lib/src/networks');
//networks.safecoin = safecoin;
//networks.safecoin.overwinter = true;

// https://github.com/Fair-Exchange/safecoin/blob/master/src/chainparams.cpp
networks.safecoin = {
  messagePrefix: '\x19Safecoin Signed Message:\n',
  bip32: {
    public: 0x0488b21f,
    private: 0x0488ade5,
  },
  pubKeyHash: 0x3d,
  scriptHash: 0x56,
  wif: 0xbd,
  dustThreshold: 1000,
  isZcash: true,
  overwinter:true,
};

networks.btcz = {
  messagePrefix: '\x19BitcoinZ Signed Message:\n',
  bip32: {
    public: 0x0488b21e,
    private: 0x0488ade4,
  },
  pubKeyHash: 0x1cb8,
  scriptHash: 0x1cbd,
  wif: 0x80,
  dustThreshold: 1000,
  isZcash: true,
};

networks.anon = {
  messagePrefix: '\x19ANON Signed Message:\n',
  bip32: {
    public: 0x0488B21E,
    private: 0x0488ADE4,
  },
  pubKeyHash: 0x0582,
  scriptHash: 0x5389,
  wif: 0x80,
  dustThreshold: 1000,
  isZcash: true,
};

networks.zclassic = {
  messagePrefix: '\x19Zclassic Signed Message:\n',
  bip32: {
    public: 0x0488B21E,
    private: 0x0488ADE4,
  },
  pubKeyHash: 0x1CB8,
  scriptHash: 0x1CBD,
  wif: 0x80,
  dustThreshold: 1000,
  isZcash: true,
};

networks.snowgem = {
  messagePrefix: '\x19SnowGem Signed Message:\n',
  bip32: {
    public: 0x0488B21E,
    private: 0x0488ADE4,
  },
  pubKeyHash: 0x1C28,
  scriptHash: 0x1C2D,
  wif: 0x80,
  dustThreshold: 1000,
  isZcash: true,
};

networks.safe = networks.safecoin;
networks.zcl = networks.zclassic;
networks.xsg = networks.snowgem;
