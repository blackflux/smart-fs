const assert = require('assert');
const fs = require('fs');

// eslint-disable-next-line no-underscore-dangle
const resolveFilenameOriginal = module.constructor._resolveFilename;
const readFileSyncOriginal = fs.readFileSync;

module.exports = (code, filename) => {
  try {
    // eslint-disable-next-line no-underscore-dangle
    module.constructor._resolveFilename = () => {
      // eslint-disable-next-line no-underscore-dangle
      module.constructor._resolveFilename = resolveFilenameOriginal;
      return filename;
    };

    fs.readFileSync = (fname, options) => {
      assert(fname === filename);
      fs.readFileSync = readFileSyncOriginal;
      return code;
    };

    // eslint-disable-next-line global-require,import/no-dynamic-require
    return require(filename);
  } finally {
    // eslint-disable-next-line no-underscore-dangle
    module.constructor._resolveFilename = resolveFilenameOriginal;
    fs.readFileSync = readFileSyncOriginal;
  }
};
