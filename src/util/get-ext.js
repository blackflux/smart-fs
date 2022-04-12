import assert from 'assert';
import path from 'path';

 export default (filename) => {
  assert(typeof filename === 'string');
  return path.extname(filename).slice(1);
};
