const { dirname } = require('path');
const filename = require('./filename');

module.exports = (url) => dirname(filename(url));
