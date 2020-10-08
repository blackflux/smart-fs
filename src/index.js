const fs = require('fs');

module.exports = { ...fs };

module.exports.guessFile = require('./logic/guess-file');
module.exports.walkDir = require('./logic/walk-dir');
module.exports.cleaningDelete = require('./logic/cleaning-delete');

module.exports.smartParse = require('./logic/smart-parse');
module.exports.smartRead = require('./logic/smart-read');
module.exports.smartWrite = require('./logic/smart-write');
