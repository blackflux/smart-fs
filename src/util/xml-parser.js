const xmlJs = require('xml-js');

module.exports.parse = (xml, { compact }) => ({
  data: xmlJs.xml2js(xml, { captureSpacesBetweenElements: true, compact }),
  meta: {
    spaceSelfClosing: xml[xml.search(/.[/?]>\n/g)] === ' '
  }
});
module.exports.stringify = (obj, { compact }) => `${
  xmlJs.js2xml(obj.data, { compact })
    .replace(/ ?([/?]>\n)/g, obj.meta.spaceSelfClosing ? ' $1' : '$1')
}`;
