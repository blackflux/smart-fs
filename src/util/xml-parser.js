const get = require('lodash.get');
const xmlJs = require('xml-js');

module.exports.parse = (xml, { compact }) => ({
  data: xmlJs.xml2js(xml, { compact }),
  meta: {
    spaceSelfClosing: xml[xml.search(/.\/>\n/g)] === ' ',
    spaces: get(xml.match(/(?<=\n)[ \t]+(?=<)/), [0], 0)
  }
});
module.exports.stringify = (obj, { compact }) => `${
  xmlJs.js2xml(obj.data, { spaces: obj.meta.spaces, compact })
    .replace(/ ?\/>\n/g, obj.meta.spaceSelfClosing ? ' />\n' : '/>\n')
    // remove added line breaks
    .replace(/\n +\n(?= +<)/g, '\n')
}\n`;
