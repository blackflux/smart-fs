const get = require('lodash.get');
const xmlJs = require('xml-js');

module.exports.parse = xml => ({
  data: xmlJs.xml2js(xml, { compact: false }),
  meta: {
    spaceSelfClosing: xml[xml.search(/.\/>\n/g)] === ' ',
    spaces: get(xml.match(/(?<=\n)[ \t]+(?=<)/), [0], 0)
  }
});
module.exports.stringify = obj => `${
  xmlJs.js2xml(obj.data, { spaces: obj.meta.spaces, compact: false })
    .replace(/ ?\/>\n/g, obj.meta.spaceSelfClosing ? ' />\n' : '/>\n')
    // remove added line breaks
    .replace(/\n +\n(?= +<)/g, '\n')
}\n`;
