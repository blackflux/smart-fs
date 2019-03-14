const xmlJs = require('xml-js');

module.exports.parse = xml => ({
  data: xmlJs.xml2js(xml, { captureSpacesBetweenElements: true }),
  meta: {
    spaceSelfClosing: xml[xml.search(/.[/?]>\n/g)] === ' '
  }
});
module.exports.stringify = obj => `${
  xmlJs.js2xml(obj.data)
    .replace(/ ?([/?]>\n)/g, obj.meta.spaceSelfClosing ? ' $1' : '$1')
}`;
