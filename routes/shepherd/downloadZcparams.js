const fs = require('fs-extra');
const _fs = require('graceful-fs');
const Promise = require('bluebird');

module.exports = (shepherd) => {
  shepherd.zcashParamsDownloadLinks = {
    'no download source selected': {
      proving: '',
      verifying: '',
      spend: '',
      output: '',
      groth16: '',
    },
    'Fair-Exchange': {
      proving: 'https://github.com/Fair-Exchange/safewallet/releases/download/data/sprout-proving.key',
      verifying: 'https://github.com/Fair-Exchange/safewallet/releases/download/data/sprout-verifying.key',
      spend: 'https://github.com/Fair-Exchange/safewallet/releases/download/data/sapling-spend.params',
      output: 'https://github.com/Fair-Exchange/safewallet/releases/download/data/sapling-output.params',
      groth16: 'https://github.com/Fair-Exchange/safewallet/releases/download/data/sprout-groth16.params',
    },
    'Zcash': {
      proving: 'https://z.cash/downloads/sprout-proving.key',
      verifying: 'https://z.cash/downloads/sprout-verifying.key',
      spend: 'https://z.cash/downloads/sapling-spend.params',
      output: 'https://z.cash/downloads/sapling-output.params',
      groth16: 'https://z.cash/downloads/sprout-groth16.params',
    },
    'Horizen': {
      proving: 'https://downloads.horizen.global/file/TrustedSetup/sprout-proving.key',
      verifying: 'https://downloads.horizen.global/file/TrustedSetup/sprout-verifying.key',
      spend: 'https://downloads.horizen.global/file/TrustedSetup/sapling-spend.params',
      output: 'https://downloads.horizen.global/file/TrustedSetup/sapling-output.params',
      groth16: 'https://downloads.horizen.global/file/TrustedSetup/sprout-groth16.params',
    },
  };

  shepherd.zcashParamsExist = () => {
    let _checkList = {
      rootDir: _fs.existsSync(shepherd.zcashParamsDir),
      provingKey: _fs.existsSync(`${shepherd.zcashParamsDir}/sprout-proving.key`),
      provingKeySize: false,
      verifyingKey: _fs.existsSync(`${shepherd.zcashParamsDir}/sprout-verifying.key`),
      verifyingKeySize: false,
      spendKey: _fs.existsSync(`${shepherd.zcashParamsDir}/sapling-spend.params`),
      spendKeySize: false,
      outputKey: _fs.existsSync(`${shepherd.zcashParamsDir}/sapling-output.params`),
      outputKeySize: false,
      groth16Key: _fs.existsSync(`${shepherd.zcashParamsDir}/sprout-groth16.params`),
      groth16KeySize: false,
      errors: false,
    };

    if (_checkList.rootDir &&
        _checkList.provingKey ||
        _checkList.verifyingKey ||
        _checkList.spendKey ||
        _checkList.outputKey ||
        _checkList.groth16Key) {
      // verify each key size
      const _provingKeySize = _checkList.provingKey ? fs.lstatSync(`${shepherd.zcashParamsDir}/sprout-proving.key`) : 0;
      const _verifyingKeySize = _checkList.verifyingKey ? fs.lstatSync(`${shepherd.zcashParamsDir}/sprout-verifying.key`) : 0;
      const _spendKeySize = _checkList.spendKey ? fs.lstatSync(`${shepherd.zcashParamsDir}/sapling-spend.params`) : 0;
      const _outputKeySize = _checkList.outputKey ? fs.lstatSync(`${shepherd.zcashParamsDir}/sapling-output.params`) : 0;
      const _groth16KeySize = _checkList.groth16Key ? fs.lstatSync(`${shepherd.zcashParamsDir}/sprout-groth16.params`) : 0;

      if (Number(_provingKeySize.size) === 910173851) { // bytes
        _checkList.provingKeySize = true;
      }
      if (Number(_verifyingKeySize.size) === 1449) {
        _checkList.verifyingKeySize = true;
      }
      if (Number(_spendKeySize.size) === 47958396) {
        _checkList.spendKeySize = true;
      }
      if (Number(_outputKeySize.size) === 3592860) {
        _checkList.outputKeySize = true;
      }
      if (Number(_groth16KeySize.size) === 725523612) {
        _checkList.groth16KeySize = true;
      }

      shepherd.log('zcashparams exist');
    } else {
      shepherd.log('zcashparams doesnt exist');
    }

    if (!_checkList.rootDir ||
        !_checkList.provingKey ||
        !_checkList.verifyingKey ||
        !_checkList.provingKeySize ||
        !_checkList.verifyingKeySize ||
        !_checkList.spendKey ||
        !_checkList.outputKey ||
        !_checkList.groth16Key ||
        !_checkList.outputKeySize ||
        !_checkList.spendKeySize ||
        !_checkList.groth16KeySize) {
      _checkList.errors = true;
    }

    return _checkList;
  }

  shepherd.zcashParamsExistPromise = () => {
    return new Promise((resolve, reject) => {
      const _verify = shepherd.zcashParamsExist();
      resolve(_verify);
    });
  };
  
  /*
   *  Update bins
   *  type:
   *  params:
   */
  shepherd.get('/zcparamsdl', (req, res, next) => {
    if (shepherd.checkToken(req.query.token)) {
      // const dlLocation = shepherd.zcashParamsDir + '/test';
      const dlLocation = shepherd.zcashParamsDir;
      const dlOption = req.query.dloption;

      const successObj = {
        msg: 'success',
        result: 'zcash params dl started',
      };

      res.end(JSON.stringify(successObj));

      for (let key in shepherd.zcashParamsDownloadLinks[dlOption]) {
        shepherd.downloadFile({
          remoteFile: shepherd.zcashParamsDownloadLinks[dlOption][key],
          localFile: key === 'spend' || key === 'output' ? `${dlLocation}/sapling-${key}.params` : (key === 'groth16' ? `${dlLocation}/sprout-${key}.params` : `${dlLocation}/sprout-${key}.key`),
          onProgress: (received, total) => {
            const percentage = (received * 100) / total;

            if (percentage.toString().indexOf('.10') > -1) {
              shepherd.io.emit('zcparams', {
                msg: {
                  type: 'zcpdownload',
                  status: 'progress',
                  file: key,
                  bytesTotal: total,
                  bytesReceived: received,
                  progress: percentage,
                },
              });
              // shepherd.log(`${key} ${percentage}% | ${received} bytes out of ${total} bytes.`);
            }
          }
        })
        .then(() => {
          const checkZcashParams = shepherd.zcashParamsExist();

          shepherd.log(`${key} dl done`);

          if (checkZcashParams.error) {
            shepherd.io.emit('zcparams', {
              msg: {
                type: 'zcpdownload',
                file: key,
                status: 'error',
                message: 'size mismatch',
                progress: 100,
              },
            });
          } else {
            shepherd.io.emit('zcparams', {
              msg: {
                type: 'zcpdownload',
                file: key,
                progress: 100,
                status: 'done',
              },
            });
            shepherd.log(`file ${key} succesfully downloaded`);
          }
        });
      }
    } else {
      const errorObj = {
        msg: 'error',
        result: 'unauthorized access',
      };

      res.end(JSON.stringify(errorObj));
    }
  });

  return shepherd;
};
