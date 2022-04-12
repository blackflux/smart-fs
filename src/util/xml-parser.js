import xmlJs from 'xml-js';

export const parse = (xml) => ({
  data: xmlJs.xml2js(xml, { captureSpacesBetweenElements: true }),
  meta: {
    spaceSelfClosing: xml[xml.search(/.[/?]>/g)] === ' '
  }
});
export const stringify = (obj) => `${
  xmlJs.js2xml(obj.data)
    .replace(/(?=[/?]>)/g, obj.meta.spaceSelfClosing ? ' ' : '')
}`;
